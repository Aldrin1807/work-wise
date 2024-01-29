using Azure.Core;
using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _service;
        public RolesController(IRoleService service)
        {
            _service = service;
        }

        #region GET
        [HttpGet("get-role/{roleName}")]
        public async Task<IActionResult> GetRole(string roleName)
        {
            try
            {
                var role = await _service.GetRole(roleName);
                return Ok(role);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        #endregion

        #region POST
        [HttpPost("add-role")]
        public async Task<IActionResult> AddRole(string roleName,string description)
        {
            try
            {
                await _service.AddRole(roleName,description);
                return Ok(new Response
                { Status = "Success", Message = "Role added succesfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        #endregion

        #region PUT
        [HttpPut("update-role/{roleName}")]
        public async Task<IActionResult> UpdateRole(string roleName,string description)
        {
            try
            {
                await _service.UpdateRole(roleName,description);
                return Ok(new Response
                { Status = "Success", Message = "Role updated succesfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        #endregion

        #region DELETE
        [HttpDelete("delete-role/{roleName}")]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            try
            {
                await _service.DeleteRole(roleName);
                return Ok(new Response
                { Status = "Success", Message = "Role deleted succesfully" });
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
