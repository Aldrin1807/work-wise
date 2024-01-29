using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Services;
using Bussiness_Logic_Layer.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authService;
        private readonly IRegistrationService _registrationService;
        public AuthController(IAuthenticationService service,IRegistrationService registrationService)
        {
            _authService = service;
            _registrationService = registrationService;
        }
        #region REGISTER
        [HttpPost("register-user")]
        public async Task<IActionResult> RegisterUser([FromForm] RegisterCandidateDTO request)
        {
            try
            {
                await _registrationService.Register(request);
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
                await _registrationService.Register(request);
                return Ok(new Response
                { Status = "Success", Message = "Successfully registered." });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        #endregion

        #region LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO request)
        {
            try
            {
                var token = await _authService.Login(request);
                return Ok(new Response
                { Status = "Success", Message = token });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        #endregion
    }
}
