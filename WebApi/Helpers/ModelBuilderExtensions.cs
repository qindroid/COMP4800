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

        User adminUser = new User
        {
            Id = 1,
            Name = "Admin",
            UserName = "admin",
            IsAdmin = true,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin"),

        };


        User normalUser = new User
        {
            Id = 2,
            Name = "User1",
            UserName = "user1",
            IsAdmin = false,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("user1"),
        };


        builder.Entity<User>().HasData(
                new List<User>
                {
                    adminUser, normalUser

                }
        );

        List<Cashflow> cashflows = new List<Cashflow> {
            new Cashflow {
                CashFlowId = 1,
                Type="In",
                Amount=100.00,
                Description="test",
                ProjectType="test",
                UserId=2,

            }
        };

        builder.Entity<Cashflow>().HasData(
        cashflows);

    }
}