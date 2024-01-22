using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly IJobsService _service;
        public JobsController(IJobsService service)
        {
            _service = service;
        }

        [HttpGet("get-job/{id}")]
        public async Task<IActionResult> GetJob(string id)
        {
            try
            {
                var job = await _service.GetJob(id);
                return Ok(job);
            }
            catch (Exception ex)
            {
                return Ok(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpGet("get-jobs/{id}")]
        public async Task<IActionResult> GetJobs(string id)
        {
            try
            {
                var jobs = await _service.GetJobs(id);
                return Ok(jobs);
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
