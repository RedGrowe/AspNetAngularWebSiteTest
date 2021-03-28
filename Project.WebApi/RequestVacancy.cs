using System;
using System.Collections.Generic;

#nullable disable

namespace Project.WebApi
{
    public partial class RequestVacancy
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Vacancy { get; set; }
        public string Communication { get; set; }
    }
}
