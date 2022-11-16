using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class m1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Expired = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsAdmin = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cashflows",
                columns: table => new
                {
                    CashFlowId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<string>(type: "TEXT", nullable: true),
                    Amount = table.Column<double>(type: "REAL", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectType = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId1 = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cashflows", x => x.CashFlowId);
                    table.ForeignKey(
                        name: "FK_Cashflows_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRoles_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 1, 300.0, "Apple", "Technology", "In", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 2, 100.0, "Apple", "Technology", "Out", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 3, 300.0, "Deloitte", "Finance", "In", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 4, 200.0, "Deloitte", "Finance", "Out", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 5, 500.0, "Chevron", "Energy", "In", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 6, 500.0, "Chevron", "Energy", "Out", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 7, 100.0, "Google", "Technology", "In", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 8, 400.0, "Google", "Technology", "Out", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 9, 200.0, "Microsoft", "Technology", "In", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 10, 200.0, "Microsoft", "Technology", "Out", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 11, 1000.0, "Meta", "Technology", "Out", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 12, 300.0, "Amazon", "Technology", "In", 2, null });

            migrationBuilder.InsertData(
                table: "Cashflows",
                columns: new[] { "CashFlowId", "Amount", "Description", "ProjectType", "Type", "UserId", "UserId1" },
                values: new object[] { 13, 400.0, "Amazon", "Technology", "In", 2, null });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "CreatedDate", "Description", "Name", "NormalizedName" },
                values: new object[] { "810f7074-293c-40e4-859e-d5da5806745d", "5371e0f8-ad12-4be4-b067-24cbe61c471a", new DateTime(2022, 11, 15, 22, 9, 57, 820, DateTimeKind.Local).AddTicks(9596), "User Role", "User", null });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "CreatedDate", "Description", "Name", "NormalizedName" },
                values: new object[] { "ff2e3a7f-9312-489c-b2cb-e6caa1d7d897", "cb491f32-deff-4632-ab30-0e2167ad4bee", new DateTime(2022, 11, 15, 22, 9, 57, 820, DateTimeKind.Local).AddTicks(9509), "Admin Role", "Admin", null });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "Expired", "IsAdmin", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "1", 0, "35096d1f-ba9e-4f60-94f1-eaf92456e802", null, false, new DateTime(2032, 11, 15, 22, 9, 57, 591, DateTimeKind.Local).AddTicks(2351), true, false, null, "Admin", null, null, "$2a$11$e53Rhajl/FTi2m6ky/DQq.Z2sTIgb.6ee14P0z97UrxuiFae7A14y", null, false, "6d207a5f-753b-4f2b-80ff-e0d400eb69eb", false, "admin" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "Expired", "IsAdmin", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "2", 0, "876c9cb9-56e1-4cb4-9715-8f7882a0467f", null, false, new DateTime(2022, 11, 22, 22, 9, 57, 820, DateTimeKind.Local).AddTicks(8753), false, false, null, "User1", null, null, "$2a$11$njd9isDYSDqeKD2oRuqsg.IPr1BSq.BsltTPihoLfabYdU002qLn2", null, false, "63b13a0f-e0b2-4622-83d0-6030e2c23f22", false, "user1" });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "Id", "RoleId", "UserId" },
                values: new object[] { "1", "ff2e3a7f-9312-489c-b2cb-e6caa1d7d897", "1" });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "Id", "RoleId", "UserId" },
                values: new object[] { "2", "810f7074-293c-40e4-859e-d5da5806745d", "2" });

            migrationBuilder.CreateIndex(
                name: "IX_Cashflows_UserId1",
                table: "Cashflows",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserId",
                table: "UserRoles",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cashflows");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
