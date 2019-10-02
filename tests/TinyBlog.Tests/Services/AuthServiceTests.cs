using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.Configuration.Settings;
using TinyBlog.Web.Services;

namespace TinyBlog.Tests.Services
{
    [TestFixture]
    public class AuthServiceTests
    {
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

            _target = new AuthService(
                _emailService.Object,
                _userDataSerice.Object,
                _authSettings.Object,
                It.IsAny<ILogger<AuthService>>());
        }

        #region TryAuthorize
        [Test]
        public async Task TryAuthorize_UserIsUnknown_NothingIsHappen()
        {
            await Task.CompletedTask;
        }

        [Test]
        public async Task TryAuthorize_asswordIsNotMatched_NothingIsHappen()
        {
            await Task.CompletedTask;
        }

        [Test]
        public async Task TryAuthorize_PasswordMatched_UserTokenIsReturned()
        {
            await Task.CompletedTask;
        }

        [Test]
        public async Task TryAuthorize_NewPasswordIsRequired_PasswordTokenIsReturned()
        {
            await Task.CompletedTask;
        }
        #endregion

        #region TryChangePassword
        [Test]
        public async Task TryChangePassword_UserIsUnknown_NothingIsHappen()
        {
            await Task.CompletedTask;
        }

        [Test]
        public async Task TryChangePassword_PasswordChangeWasNotRequested_NothingIsHappen()
        {
            await Task.CompletedTask;
        }

        [Test]
        public async Task TryChangePassword_PasswordChangeTokenMismatch_NothingIsHappen()
        {
            await Task.CompletedTask;
        }
        #endregion

        #region SaveUser
        [Test]
        public async Task SaveUser_UserIsKnown_ChangesApplied()
        {
            await Task.CompletedTask;
        }

        [Test]
        public async Task SaveUser_UserIsUnknown_UserCreated()
        {
            await Task.CompletedTask;
        }
        #endregion
    }
}
