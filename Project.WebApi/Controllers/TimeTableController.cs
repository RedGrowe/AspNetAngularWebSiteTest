using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeTableController : Controller
    {
        private readonly ILogger<Times> _logger;
        List<Times> ItemList = new List<Times>();
        public TimeTableController(ILogger<Times> logger)
        {
            _logger = logger;
        }
        [HttpPost]
        [Route("getTime")]
        public JsonResult Get(FilterTime item)
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var timeDTOList = new List<TimesDTO>();
                ItemList = db.Times.Where(x => x.IdUser == Guid.Parse(item.IdUser)).Where(x => x.Date > item.DateFrom).Where(x => x.Date < item.DateTo).ToList();
                foreach (var itemtime in ItemList)
                {
                    var newTime = new TimesDTO();
                    newTime.Date = itemtime.Date;
                    newTime.FactValue = itemtime.FactValue;
                    newTime.IdUser = itemtime.IdUser.ToString();
                    newTime.Id = itemtime.Id.ToString();
                    newTime.Value = itemtime.Value;
                    timeDTOList.Add(newTime);
                }
            }

            return new JsonResult(ItemList);
        }
        [HttpPost]
        [Route("getTimeAll")]
        public JsonResult GetAll(FilterTime item)
        {
            var timeDTOList = new List<TimesDTO>();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var linkList = db.Ctlinks.Where(x => x.IdCourse == Guid.Parse(item.CourseId)).Select(x => x.IdUser).ToList();
                var timeList = db.Times.Where(x => x.Date > item.DateFrom).Where(x => x.Date < item.DateTo).Where(x => linkList.Contains(x.IdUser)).ToList();
                foreach (var itemtime in timeList)
                {
                    var newTime = new TimesDTO();
                    newTime.Date = itemtime.Date;
                    newTime.FactValue = itemtime.FactValue;
                    newTime.IdUser = itemtime.IdUser.ToString();
                    newTime.Value = itemtime.Value;

                    if (timeList.Where(x => x.Date == itemtime.Date).ToList().Count > 1)
                    {
                        if (timeDTOList.Where(x => x.Date == itemtime.Date).ToList().Count == 0)
                        {
                            var time = new TimesDTO();
                            time.Date = itemtime.Date;
                            time.FactValue = ItemList.Where(x => x.Date == itemtime.Date).Sum(x => x.FactValue);
                            time.Value = ItemList.Where(x => x.Date == itemtime.Date).Sum(x => x.Value);
                            timeDTOList.Add(time);
                        }
                    }
                    else
                    {
                        timeDTOList.Add(newTime);
                    }
                }
            }

            return new JsonResult(timeDTOList);
        }

        [HttpPost]
        public JsonResult Insert(List<TimesDTO> item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {

                foreach (var time in item)
                {
                    var newTime = new Times();
                    newTime.Date = time.Date;
                    newTime.FactValue = time.FactValue;
                    newTime.IdUser = Guid.Parse(time.IdUser);
                    newTime.Value = time.Value;

                    if (time.Id != "0")
                    {
                        newTime.Id = Guid.Parse(time.Id);
                        if (time.FactValue != 0 || time.Value != 0)
                        {
                            db.Times.Update(newTime);
                            db.SaveChanges();
                        }
                        else
                        {
                            db.Times.Remove(newTime);
                            db.SaveChanges();
                        }
                    }
                    else
                    {

                        if (time.FactValue != 0 || time.Value != 0)
                        {
                            newTime.Id = new Guid();
                            db.Times.Add(newTime);
                            db.SaveChanges();
                        }

                    }
                }
                return new JsonResult("Added Success");
            }
        }
        [HttpPost]
        [Route("getTimeForHour")]
        public JsonResult GetTimeForHour(FilterTime item)
        {
            var result = new StructureUserTime();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {

                var linkList = db.Ctlinks.Where(x => x.IdCourse == Guid.Parse(item.CourseId)).Select(x => x.IdUser).ToList();
                var TimesList = db.Times.Where(x => x.Date == item.DateNow).Where(x => linkList.Contains(x.IdUser)).ToList();
                var UserList = db.Accounts.Where(x => linkList.Contains(x.Id)).ToList();
                foreach (var itemtime in TimesList)
                {
                    var newTime = new TimesDTO();
                    newTime.Date = itemtime.Date;
                    newTime.FactValue = itemtime.FactValue;
                    newTime.IdUser = itemtime.IdUser.ToString();
                    newTime.Id = itemtime.Id.ToString();
                    newTime.Value = itemtime.Value;
                    result.Times.Add(newTime);
                }
                foreach (var itemtime in UserList)
                {
                    var newTime = new AccountDTO();
                    newTime.Firstname = itemtime.Firstname;
                    newTime.Lastname = itemtime.Lastname;
                    newTime.Password = itemtime.Password;
                    newTime.Id = itemtime.Id.ToString();
                    newTime.Role = itemtime.Role;
                    newTime.Username = itemtime.Username;
                    newTime.Email = itemtime.Email;
                    result.Account.Add(newTime);
                }
            }

            return new JsonResult(result);
        }
    }
}

