using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("register-user")]
        public async Task<IActionResult> RegisterUser([FromForm] RegisterUserDTO request)
        {
            try
            {
                await _service.Register(request);
                return Ok(new Response
                { Status = "Success", Message = "Successfully registered." });
            }
            catch(Exception ex)
            {
                return Ok(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        [HttpPost("register-employer")]
        public async Task<IActionResult> RegisterEmployer([FromForm] RegisterCompanyDTO request)
        {
            try
            {
                await _service.Register(request);
                return Ok(new Response
                { Status = "Success", Message = "Successfully registered." });
            }
            catch (Exception ex)
            {
                return Ok(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
    }
}
