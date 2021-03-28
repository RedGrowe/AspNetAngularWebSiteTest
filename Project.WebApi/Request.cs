using System;
using System.Collections.Generic;

#nullable disable

namespace Project.WebApi
{
    public partial class Request
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Coursename { get; set; }
        public string Mobilephone { get; set; }
        public string Communicationname { get; set; }
        public string Email { get; set; }
    }
}
