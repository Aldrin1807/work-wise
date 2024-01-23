using Azure.Core;
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
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpGet("get-jobs/{id}")]
        public async Task<IActionResult> GetEmployersJobs(string id)
        {
            try
            {
                var jobs = await _service.GetEmployersJobs(id);
                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpGet("get-jobs")]
        public async Task<IActionResult> GetPopularJobs()
        {
            try
            {
                var jobs = await _service.GetJobs();
                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpGet("get-filtered-jobs")]
        public async Task<IActionResult> GetFilteredJobs([FromQuery] string? keyword,[FromQuery] string? location, [FromQuery] string? type)
        {
            try
            {
                var jobs = await _service.GetFilteredJobs(keyword,location,type);
                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpGet("get-candidate-applications/{id}")]
        public async Task<IActionResult> GetCandidateApplications(string id)
        {
            try
            {
                var application = await _service.GetCandidateApplications(id);
                return Ok(application);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpGet("has-applied")]
        public async Task<IActionResult> HasApplied([FromQuery] string userId, [FromQuery] string jobId)
        {
            try
            {
                var response = await _service.HasApplied(userId,jobId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
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
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpPost("add-application")]
        public async Task<IActionResult> AddApplication([FromBody] JobApplicationDTO request)
        {
            try
            {
                await _service.AddJobApplication(request);
                return Ok(new Response
                { Status = "Success", Message = "Applied succesfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpDelete("remove-application/{id}")]
        public async Task<IActionResult> RemoveApplication(string id)
        {
            try
            {
                await _service.RemoveApplication(id);
                return Ok(new Response
                { Status = "Success", Message = "Removed succesfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
    }
}
