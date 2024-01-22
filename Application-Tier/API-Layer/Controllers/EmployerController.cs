using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerService _service;
        public EmployerController(IEmployerService service)
        {
            _service = service;
        }

        [HttpGet("get-employer/{id}")]
        public async Task<IActionResult> GetEmployer(string id)
        {
            try
            {
                var employer = await _service.GetEmployer(id);
                return Ok(employer);
            }
            catch (Exception ex)
            {
                return Ok(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpPost("post-job")]
        public async Task<IActionResult> PostJob([FromBody] JobDTO request)
        {
            try
            {
                await _service.PostJob(request);
                return Ok(new Response
                { Status = "Success", Message = "Job posted succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
    }
}
