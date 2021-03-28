using System;
using System.Collections.Generic;

#nullable disable

namespace Project.WebApi
{
    public partial class Account
    {
        public Guid Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    public partial class Times
    {
        public Guid Id { get; set; }
        public Guid IdUser { get; set; }
        public int Value { get; set; }
        public int FactValue { get; set; }
        public DateTime Date { get; set; }

    }

    public partial class CTLink
    {
        public Guid Id { get; set; }
        public Guid IdUser { get; set; }
        public Guid IdCourse { get; set; }
    }
}
