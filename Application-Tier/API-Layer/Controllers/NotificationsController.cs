using Azure.Core;
using Bussiness_Logic_Layer.DTOs;
using Bussiness_Logic_Layer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationsService _service;
        public NotificationsController(INotificationsService service)
        {
            _service = service;
        }

        [HttpGet("get-notifications/{id}")]
        public async Task<IActionResult> GetNotifications(string id)
        {
            try
            {
                var notifications = await _service.GetNotifications(id);
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateStatus(string id,[FromBody]string status)
        {
            try
            {
                await _service.UpdateStatus(id,status);
                return Ok(new Response
                { Status = "Success", Message = "Notification updated succesfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        [HttpPut("update-statuses/{id}")]
        public async Task<IActionResult> UpdateStatuses(string id,[FromBody]string status)
        {
            try
            {
                await _service.UpdateStatuses(id,status);
                return Ok(new Response
                { Status = "Success", Message = "Notifications updated succesfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }

        [HttpDelete("delete-notification/{id}")]
        public async Task<IActionResult> DeleteNotification(string id)
        {
            try
            {
                await _service.DeleteNotification(id);
                return Ok(new Response
                { Status = "Success", Message = "Notification deleted succesfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
    }
}
