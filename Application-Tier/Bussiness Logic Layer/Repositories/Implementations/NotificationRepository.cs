﻿using Bussiness_Logic_Layer.Repositories.Interfaces;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace Bussiness_Logic_Layer.Repositories.Implementations
{
    public class NotificationRepository:INotificationRepository
    {
        private readonly AppDbContext _context;
        public NotificationRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Notification>> GetNotifications(string id)
        {
            if (string.IsNullOrEmpty(id))
                throw new Exception("Id was empty");
            var notifications = await _context.Notifications
                                                            .Where(n => n.UserId == id)
                                                            .OrderByDescending(n => n.DateTimeCreated)
                                                            .ToListAsync();
            return notifications;
        }
        public async Task AddNotification(Notification notification)
        {
            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteNotification(string id)
        {
            if (string.IsNullOrEmpty(id))
                throw new Exception("Id was empty");
            var notification = await _context.Notifications.FirstOrDefaultAsync(n => n.Id == id);
            if (notification == null)
                throw new Exception("Notification not found");
            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateStatus(string id, string status)
        {
            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(status))
                throw new Exception("Request was empty");
            var notification = await _context.Notifications.FirstOrDefaultAsync(n => n.Id == id);
            if (notification == null)
                throw new Exception("Notification not found");
            notification.Status = status;

            _context.Notifications.Update(notification);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateStatuses(string userId, string status)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(status))
                throw new Exception("Request was empty");

            var notifications = await _context.Notifications.Where(n => n.UserId == userId).ToListAsync();
            foreach (var notification in notifications)
            {
                notification.Status = status;
                _context.Update(notification);
            }
            await _context.SaveChangesAsync();
        }
    }
}
