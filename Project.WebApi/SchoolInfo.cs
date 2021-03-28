using System;
using System.Collections.Generic;

#nullable disable

namespace Project.WebApi
{
    public partial class SchoolInfo
    {
        public Guid Id { get; set; }
        public string SchoolAbout { get; set; }
        public string ContactAbout { get; set; }
    }
}
