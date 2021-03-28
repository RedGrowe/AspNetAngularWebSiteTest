using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebApi
{
    public class FilterTime
    {
        public string IdUser { get; set; }
        public string CourseId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public DateTime DateNow { get; set; }
    }
    public partial class TimesDTO
    {
        public string Id { get; set; }
        public string IdUser { get; set; }
        public int Value { get; set; }
        public int FactValue { get; set; }
        public DateTime Date { get; set; }

    }
    public partial class AccountDTO
    {
        public string Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
    public class StructureUserTime
    {
        public List<AccountDTO> Account { get; set; } = new List<AccountDTO>();
        public List<TimesDTO> Times { get; set; } = new List<TimesDTO>();
    }
}
