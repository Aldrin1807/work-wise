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
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationRepository _repository;
        public NotificationsController(INotificationRepository repository)
        {
            _repository = repository;
        }

        #region GET
        [HttpGet("get-notifications/{id}")]
        public async Task<IActionResult> GetNotifications(string id)
        {
            try
            {
                var notifications = await _repository.GetNotifications(id);
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        #endregion

        #region PUT
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateStatus(string id,[FromBody]string status)
        {
            try
            {
                await _repository.UpdateStatus(id,status);
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
                await _repository.UpdateStatuses(id,status);
                return Ok(new Response
                { Status = "Success", Message = "Notifications updated succesfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                { Status = "Error", Message = ex.Message });
            }
        }
        #endregion

        #region DELETE
        [HttpDelete("delete-notification/{id}")]
        public async Task<IActionResult> DeleteNotification(string id)
        {
            try
            {
                await _repository.DeleteNotification(id);
                return Ok(new Response
                { Status = "Success", Message = "Notification deleted succesfully" });
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
