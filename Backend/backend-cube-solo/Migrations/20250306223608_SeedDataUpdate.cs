using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend_cube_solo.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "departments",
                columns: new[] { "department_id", "name" },
                values: new object[,]
                {
                    { 1, "IT" },
                    { 2, "HR" },
                    { 3, "Finance" },
                    { 4, "Marketing" },
                    { 5, "Sales" }
                });

            migrationBuilder.InsertData(
                table: "locations",
                columns: new[] { "location_id", "city" },
                values: new object[,]
                {
                    { 1, "Paris" },
                    { 2, "Nantes" },
                    { 3, "Toulouse" },
                    { 4, "Nice" },
                    { 5, "Lille" }
                });

            migrationBuilder.InsertData(
                table: "employees",
                columns: new[] { "employee_id", "department_id", "email", "first_name", "is_admin", "join_date", "landline_phone_number", "last_name", "leave_date", "location_id", "mobile_phone_number" },
                values: new object[] { 1, 1, "super.admin@gmail.com", "Super", true, new DateOnly(2021, 1, 1), "0123456789", "Admin", null, 1, "0123456789" });

            migrationBuilder.InsertData(
                table: "employees",
                columns: new[] { "employee_id", "department_id", "email", "first_name", "join_date", "landline_phone_number", "last_name", "leave_date", "location_id", "mobile_phone_number" },
                values: new object[,]
                {
                    { 2, 2, "jhon.doe@gmail.com", "John", new DateOnly(2021, 1, 1), "0123456789", "Doe", null, 1, "0123456789" },
                    { 3, 3, "pierre.dupont@gmail.com", "Pierre", new DateOnly(2021, 1, 1), "0123456789", "Dupont", null, 2, "0123456789" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "departments",
                keyColumn: "department_id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "departments",
                keyColumn: "department_id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "employees",
                keyColumn: "employee_id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "employees",
                keyColumn: "employee_id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "employees",
                keyColumn: "employee_id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "locations",
                keyColumn: "location_id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "locations",
                keyColumn: "location_id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "locations",
                keyColumn: "location_id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "departments",
                keyColumn: "department_id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "departments",
                keyColumn: "department_id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "departments",
                keyColumn: "department_id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "locations",
                keyColumn: "location_id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "locations",
                keyColumn: "location_id",
                keyValue: 2);
        }
    }
}
