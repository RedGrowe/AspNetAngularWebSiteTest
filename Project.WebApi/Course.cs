﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Project.WebApi
{
    public partial class Course
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string GroupNumber { get; set; }
    }
}
