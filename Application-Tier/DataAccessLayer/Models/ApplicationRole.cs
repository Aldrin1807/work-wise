using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models
{
    public class ApplicationRole:IdentityRole
    {
        public string? Description { get; set; }
    }
}
