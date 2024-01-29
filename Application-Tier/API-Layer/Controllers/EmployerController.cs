using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Repositories.Interfaces;
using Bussiness_Logic_Layer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerRepository _repository;
        public EmployerController(IEmployerRepository repository)
        {
            _repository = repository;
        }

        #region GET
        [HttpGet("get-employer/{id}")]
        public async Task<IActionResult> GetEmployer(string id)
        {
            try
            {
                var employer = await _repository.GetEmployer(id);
                return Ok(employer);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpGet("get-employers")]
        public async Task<IActionResult> GetEmployers()
        {
            try
            {
                var employers = await _repository.GetEmployers();
                return Ok(employers);
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
