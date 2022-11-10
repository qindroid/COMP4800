using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Entities
{
    public class Role: IdentityRole
    {
        public Role() : base() { }

        public Role(string name) : base(name) { }

        public Role(string roleName, string description, 
            DateTime createdDate) : base(roleName)
        {
            base.Name = roleName;
            this.Description = description;
            this.CreatedDate = createdDate;
        }

        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}