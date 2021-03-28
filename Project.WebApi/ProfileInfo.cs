using System;
using System.Collections.Generic;

#nullable disable

namespace Project.WebApi
{
    public partial class ProfileInfo
    {
        public ProfileInfo() { }
        public ProfileInfo(string UserName)
        {
            Username = UserName;
            MainPhotoConfirmed = false;
            FirstConfirmed = false;
            SecondConfirmed = false;
            ThirdConfirmed = false;
            FourthConfirmed = false;
        }
        public string Username { get; set; }
        public string MainPhoto { get; set; }
        public string FirstDoc { get; set; }
        public string SecondDoc { get; set; }
        public string ThirdDoc { get; set; }
        public string FourthDoc { get; set; }
        public bool? FirstConfirmed { get; set; }
        public bool? SecondConfirmed { get; set; }
        public bool? ThirdConfirmed { get; set; }
        public bool? FourthConfirmed { get; set; }
        public bool? MainPhotoConfirmed { get; set; }
        public string Course { get; set; }
        public string Grade { get; set; }
        public string AboutMe { get; set; }
    }
}
