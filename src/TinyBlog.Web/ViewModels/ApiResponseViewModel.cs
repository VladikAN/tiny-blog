namespace TinyBlog.Web.ViewModels
{
    public class ApiResponseViewModel
    {
        protected ApiResponseViewModel()
        {
        }

        public bool IsSuccess { get; private set; }
        public object Payload { get; private set; }

        public static ApiResponseViewModel Success(object payload = null)
        {
            return new ApiResponseViewModel { IsSuccess = true, Payload = payload };
        }

        public static ApiResponseViewModel Failed()
        {
            return new ApiResponseViewModel { IsSuccess = false, Payload = null };
        }
    }
}