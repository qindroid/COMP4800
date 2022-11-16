using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using BCrypt.Net;

namespace WebApi.Helpers;

public static class ModelBuilderExtensions
{
    public static void Seed(this ModelBuilder builder)
    {
        // Seeding users
        User adminUser = new User
        {
            Id = "1",
            Name = "Admin",
            UserName = "admin",
            IsAdmin = true,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin"),
            Expired = DateTime.Now.AddYears(10),

        };

        User normalUser = new User
        {
            Id = "2",
            Name = "User1",
            UserName = "user1",
            IsAdmin = false,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("user1"),
            Expired = DateTime.Now.AddDays(7),
        };


        builder.Entity<User>().HasData(
                new List<User>
                {
                    adminUser, normalUser

                }
        );

        // Seeding cashflows
        List<Cashflow> cashflows = new List<Cashflow> {
            new Cashflow {
                CashFlowId = 1,
                Type="In",
                Amount=300.00,
                Description="Apple",
                ProjectType="Technology",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 2,
                Type="Out",
                Amount=100.00,
                Description="Apple",
                ProjectType="Technology",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 3,
                Type="In",
                Amount=300.00,
                Description="Deloitte",
                ProjectType="Finance",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 4,
                Type="Out",
                Amount=200.00,
                Description="Deloitte",
                ProjectType="Finance",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 5,
                Type="In",
                Amount=500.00,
                Description="Chevron",
                ProjectType="Energy",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 6,
                Type="Out",
                Amount=500.00,
                Description="Chevron",
                ProjectType="Energy",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 7,
                Type="In",
                Amount=100.00,
                Description="Google",
                ProjectType="Technology",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 8,
                Type="Out",
                Amount=400.00,
                Description="Google",
                ProjectType="Technology",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 9,
                Type="In",
                Amount=200.00,
                Description="Microsoft",
                ProjectType="Technology",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 10,
                Type="Out",
                Amount=200.00,
                Description="Microsoft",
                ProjectType="Technology",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 11,
                Type="Out",
                Amount=1000.00,
                Description="Meta",
                ProjectType="Technology",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 12,
                Type="In",
                Amount=300.00,
                Description="Amazon",
                ProjectType="Technology",
                UserId=2,
            },
            new Cashflow {
                CashFlowId = 13,
                Type="In",
                Amount=400.00,
                Description="Amazon",
                ProjectType="Technology",
                UserId=2,
            },
        };

        builder.Entity<Cashflow>().HasData(cashflows);

        // Seeding roles
        Role adminRole = new Role("Admin", "Admin Role", DateTime.Now);
        Role userRole = new Role("User", "User Role", DateTime.Now);

        List<Role> roles = new List<Role>() {
           adminRole,
           userRole
        };

        builder.Entity<Role>().HasData(roles);

        // Seeding user roles
        List<UserRoles> userRoles = new List<UserRoles>();

        userRoles.Add(new UserRoles
        {
            Id = "1",
            UserId = adminUser.Id,
            RoleId = adminRole.Id
        });

        userRoles.Add(new UserRoles
        {
            Id = "2",
            UserId = normalUser.Id,
            RoleId = userRole.Id
        });

        // builder.Entity<UserRoles>(entity =>
        // {
        //     entity.HasData(userRoles);
        // });

        builder.Entity<UserRoles>().HasData(userRoles);


    }
}