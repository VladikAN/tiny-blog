﻿using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.DataServices.Services.Dto;
using TinyBlog.Web.Configuration.Settings;
using TinyBlog.Web.Services;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Tests.Services
{
    [TestFixture]
    public class AuthServiceTests
    {
        private const string DefaultPassword = "password";
        private const string PasswordHash = "MCweguHdWAupai7MloFR9xOKFsio4C7n4Wgj6dEMC10=";
        private readonly string PasswordSalt = "cGFzc3dvcmQtc2FsdA==";

        private Mock<IEmailService> _emailService;
        private Mock<IUserDataService> _userDataSerice;
        private Mock<IAuthSettings> _authSettings;

        private AuthService _target;

        [SetUp]
        public void Setup()
        {
            _emailService = new Mock<IEmailService>();
            _userDataSerice = new Mock<IUserDataService>();
            _authSettings = new Mock<IAuthSettings>();

            _authSettings.SetupGet(x => x.Issuer).Returns("Issuer");
            _authSettings.SetupGet(x => x.Audience).Returns("Audience");
            _authSettings.SetupGet(x => x.Secret)
                .Returns("cGFzc3dvcmQtc2VjcmV0LXdpdGgtYmlnLWVub3VnaC1sZW5ndGg=");

            _target = new AuthService(
                _emailService.Object,
                _userDataSerice.Object,
                _authSettings.Object,
                new Mock<ILogger<AuthService>>().Object);
        }

        #region TryAuthorize
        [Test]
        public async Task TryAuthorize_UserIsUnknown_NothingIsHappen()
        {
            // Act & Assert
            var result = await _target.TryAuthorize("username", DefaultPassword);
            Assert.IsNull(result);

            _userDataSerice.Verify(x => x.GetCredentials("username"), Times.Once);
        }

        [Test]
        public async Task TryAuthorize_PasswordIsNotMatched_NothingIsHappen()
        {
            // Arrange
            var credentials = SetCredentials();

            // Act & Assert
            var result = await _target.TryAuthorize(credentials.Username, "invalid-password");
            Assert.IsNull(result);

            _userDataSerice.Verify(x => x.GetCredentials(credentials.Username), Times.Once);
            _userDataSerice.Verify(x => x.PutFailedLogin(credentials.Username), Times.Once);
        }

        [Test]
        public async Task TryAuthorize_PasswordMatched_UserTokenIsReturned()
        {
            // Arrange
            var credentials = SetCredentials(useDefaultPassword: true);

            // Act & Assert
            var result = await _target.TryAuthorize(credentials.Username, DefaultPassword);
            Assert.IsNotNull(result);
            Assert.AreEqual(credentials.Username, result.Username);
            Assert.IsNotNull(result.Token);
            Assert.IsNull(result.PasswordToken);

            _userDataSerice.Verify(x => x.GetCredentials(credentials.Username), Times.Once);
        }

        [Test]
        public async Task TryAuthorize_NewPasswordIsRequired_PasswordTokenIsReturned()
        {
            // Arrange
            var credentials = SetCredentials(changePassword: true, useDefaultPassword: true);

            // Act & Assert
            var result = await _target.TryAuthorize(credentials.Username, DefaultPassword);
            Assert.IsNotNull(result);
            Assert.AreEqual(credentials.Username, result.Username);
            Assert.IsNull(result.Token);
            Assert.AreEqual(credentials.ChangePasswordToken, result.PasswordToken);

            _userDataSerice.Verify(x => x.GetCredentials(credentials.Username), Times.Once);
        }
        #endregion

        #region TryChangePassword
        [Test]
        public async Task TryChangePassword_UserIsUnknown_NothingIsHappen()
        {
            // Act & Assert
            var result = await _target.TryChangePassword("username", "new-password", "token");
            Assert.IsFalse(result);

            _userDataSerice.Verify(x => x.GetCredentials("username"), Times.Once);
            _userDataSerice
                .Verify(x => x.SaveNewCredentials(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never);
        }

        [Test]
        public async Task TryChangePassword_PasswordChangeWasNotRequested_NothingIsHappen()
        {
            // Arrange
            var credentials = SetCredentials();

            // Act & Assert
            var result = await _target.TryChangePassword(credentials.Username, "new-password", "token");
            Assert.IsFalse(result);

            _userDataSerice.Verify(x => x.GetCredentials(credentials.Username), Times.Once);
            _userDataSerice
                .Verify(x => x.SaveNewCredentials(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never);
        }


        [Test]
        public async Task TryChangePassword_PasswordChangeTokenMismatch_NothingIsHappen()
        {
            // Arrange
            var credentials = SetCredentials(changePassword: true);

            // Act & Assert
            var result = await _target.TryChangePassword(credentials.Username, "new-password", "wrong-token");
            Assert.IsFalse(result);

            _userDataSerice.Verify(x => x.GetCredentials(credentials.Username), Times.Once);
            _userDataSerice
                .Verify(x => x.SaveNewCredentials(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never);
            _userDataSerice.Verify(x => x.PutFailedLogin(credentials.Username), Times.Once);
        }

        [Test]
        public async Task TryChangePassword_TokenMatchedButSaveFailed_FalseReturned()
        {
            // Arrange
            var credentials = SetCredentials(changePassword: true);

            _userDataSerice
                .Setup(x => x.SaveNewCredentials(credentials.Username, It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(false);

            // Act & Assert
            var result = await _target.TryChangePassword(credentials.Username, DefaultPassword, credentials.ChangePasswordToken);
            Assert.IsFalse(result);

            _userDataSerice.Verify(x => x.GetCredentials(credentials.Username), Times.Once);
            _userDataSerice
                .Verify(x => x.SaveNewCredentials(credentials.Username, It.IsAny<string>(), It.IsAny<string>()), Times.Once);
        }

        [Test]
        public async Task TryChangePassword_TokenMatchedAndSaveSuccess_TrueReturned()
        {
            // Arrange
            var credentials = SetCredentials(changePassword: true);

            _userDataSerice
                .Setup(x => x.SaveNewCredentials(credentials.Username, It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(true);

            // Act & Assert
            var result = await _target.TryChangePassword(credentials.Username, DefaultPassword, credentials.ChangePasswordToken);
            Assert.IsTrue(result);

            _userDataSerice.Verify(x => x.GetCredentials(credentials.Username), Times.Once);
            _userDataSerice
                .Verify(x => x.SaveNewCredentials(credentials.Username, It.IsAny<string>(), It.IsAny<string>()), Times.Once);
        }
        #endregion

        #region SaveUser
        [Test]
        public async Task SaveUser_UserIsKnown_Edited()
        {
            // Arrange
            var model = new UserViewModel { Username = "username", Email = "new-email" };
            var userDto = new UserDto("username", "email", true, false, false);

            _userDataSerice
                .Setup(x => x.Get(model.Username))
                .ReturnsAsync(userDto);
            _userDataSerice
                .Setup(x => x.Save(It.IsAny<UserDto>(), It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(true);

            // Act & Assert
            var result = await _target.SaveUser(model);
            Assert.IsTrue(result);

            _userDataSerice.Verify(x => x.Get(model.Username), Times.Once);
            _userDataSerice.Verify(x => x.Save(
                It.Is<UserDto>(dt => dt.Email == model.Email && dt.Username == model.Username),
                null,
                null),
                Times.Once);
            _emailService.Verify(x => x.NewUser(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never);
        }

        [Test]
        public async Task SaveUser_UserIsUnknown_UserCreated()
        {
            // Arrange
            var model = new UserViewModel { Username = "username", Email = "new-email" };

            _userDataSerice
                .Setup(x => x.Get(model.Username))
                .ReturnsAsync((UserDto)null);
            _userDataSerice
                .Setup(x => x.Save(It.IsAny<UserDto>(), It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(true);

            // Act & Assert
            var result = await _target.SaveUser(model);
            Assert.IsTrue(result);

            _userDataSerice.Verify(x => x.Get(model.Username), Times.Once);
            _userDataSerice
                .Verify(x => x.Save(
                    It.Is<UserDto>(dt => dt.Email == model.Email && dt.Username == model.Username),
                    It.Is<string>(str => str.Length > 0),
                    It.Is<string>(str => str.Length > 0)),
                    Times.Once);
            _emailService.Verify(x => x.NewUser(model.Username, model.Email, It.Is<string>(str => str.Length > 0)), Times.Once);
        }

        [Test]
        public async Task SaveUser_FailedSaveForNewUser_FalseReturned()
        {
            // Arrange
            var model = new UserViewModel { Username = "username", Email = "new-email" };

            _userDataSerice
                .Setup(x => x.Get(model.Username))
                .ReturnsAsync((UserDto)null);
            _userDataSerice
                .Setup(x => x.Save(It.IsAny<UserDto>(), It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(false);

            // Act & Assert
            var result = await _target.SaveUser(model);
            Assert.IsFalse(result);

            _userDataSerice.Verify(x => x.Get(model.Username), Times.Once);
            _userDataSerice
                .Verify(x => x.Save(
                    It.Is<UserDto>(dt => dt.Email == model.Email && dt.Username == model.Username),
                    It.Is<string>(str => str.Length > 0),
                    It.Is<string>(str => str.Length > 0)),
                    Times.Once);
            _emailService.Verify(x => x.NewUser(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never);
        }
        #endregion

        private AuthDto SetCredentials(bool changePassword = false, bool useDefaultPassword = false, bool isLocked = false)
        {
            var hash = useDefaultPassword
                ? PasswordHash
                : Guid.NewGuid().ToString("N");

            var credentials = new AuthDto(
                $"username-{Guid.NewGuid().ToString("N")}",
                $"email-{Guid.NewGuid().ToString("N")}",
                hash: hash,
                salt: PasswordSalt,
                changePassword,
                changePasswordToken: Guid.NewGuid().ToString("N"),
                isLocked);

            _userDataSerice
                .Setup(x => x.GetCredentials(credentials.Username))
                .ReturnsAsync(credentials);

            return credentials;
        }
    }
}
