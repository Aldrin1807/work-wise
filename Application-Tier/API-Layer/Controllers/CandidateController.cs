using Azure.Core;
using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Repositories.Interfaces;
using Bussiness_Logic_Layer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly ICandidateRepository _repository;
        public CandidateController(ICandidateRepository repository)
        {
            _repository = repository;
        }

        #region GET
        [HttpGet("get-user/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            try
            {
                var user = await _repository.GetCandidate(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        #endregion

        #region PUT
        [HttpPut("update-additional-info")]
        public async Task<IActionResult> UpdateAditionalInfo([FromBody] AdditionalDataDTO request)
        {
            try
            {
                await _repository.SaveAdditionalData(request);
                return Ok(new Response
                { Status = "Success", Message = "Additional data saved succesfully" });
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
