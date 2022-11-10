using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Entities
{
    public class UserRoles: IdentityUserRole<String>
    {
        [Key]
        public string Id { get; set; }
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}