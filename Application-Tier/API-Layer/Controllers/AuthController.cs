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
        public async Task<IActionResult> RegisterUser([FromForm] RegisterCandidateDTO request)
        {
            try
            {
                await _service.Register(request);
                return Ok(new Response
                { Status = "Success", Message = "Successfully registered." });
            }
            catch(Exception ex)
            {
                return BadRequest(new Response
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
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO request)
        {
            try
            {
                var token = await _service.Login(request);
                return Ok(new Response
                { Status = "Success", Message = token });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
    }
}
