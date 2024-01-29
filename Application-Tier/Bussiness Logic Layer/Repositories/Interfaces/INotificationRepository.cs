using DataAccessLayer.Models;

namespace Bussiness_Logic_Layer.Repositories.Interfaces
{
    public interface INotificationRepository
    {
        Task<List<Notification>> GetNotifications(string id);
        Task AddNotification(Notification notification);
        Task DeleteNotification(string id);
        Task UpdateStatus(string id, string status);
        Task UpdateStatuses(string userId, string status);
    }
}
