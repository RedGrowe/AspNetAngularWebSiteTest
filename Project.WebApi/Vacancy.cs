using System;
using System.Collections.Generic;

#nullable disable

namespace Project.WebApi
{
    public partial class Vacancy
    {
        public Guid Id { get; set; }
        public string VacancyName { get; set; }
        public bool? Visibility { get; set; }
    }
}
