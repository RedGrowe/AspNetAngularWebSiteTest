using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Project.WebApi.StaticModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Timers;

namespace Project.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestVacancyController : Controller
    {
        private readonly ILogger<RequestVacancyController> _logger;
        List<RequestVacancy> ItemList = new List<RequestVacancy>();

        public RequestVacancyController(ILogger<RequestVacancyController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.RequestVacancies.OrderBy(x => x.Name).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        public JsonResult Insert(RequestVacancy item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = Guid.NewGuid();
                db.RequestVacancies.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(RequestVacancy item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var value = db.RequestVacancies.Where(x => x.Id == item.Id).FirstOrDefault();
                if (value != null)
                {
                    value.Communication = item.Communication;
                    value.Email = item.Email;
                    value.Mobile = item.Mobile;
                    value.Name = item.Name;
                    value.Vacancy = item.Vacancy;
                    db.SaveChanges();
                }
            }
            return new JsonResult("Update Success");
        }


        [HttpPost]
        [Route("mail")]
        public JsonResult SendEmail(RequestVacancy item)
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("school.rus.lit@gmail.com", "goodIDEA1489"),
                EnableSsl = true
            };
            Random rnd = new Random();
            string key = rnd.Next(0, 10).ToString() + rnd.Next(0, 10).ToString() + rnd.Next(0, 10).ToString() + rnd.Next(0, 10).ToString();
            client.Send("school.rus.lit@gmail.com", item.Email.ToString(), "Подтверждение заявки",
                "Введите данный код на сайте: " + key);
            Auth.MailCode.Add(item.Email, key);
            return new JsonResult("Email Sended");
        }

        [HttpPost, Route("sendMailData")]
        public JsonResult SendMailData(RequestVacancy item)
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("school.rus.lit@gmail.com", "goodIDEA1489"),
                EnableSsl = true
            };
            Random rnd = new Random();
            string password = rnd.Next(0, 10).ToString() + rnd.Next(0, 10).ToString() + rnd.Next(0, 10).ToString() + rnd.Next(0, 10).ToString();
            client.Send("school.rus.lit@gmail.com", item.Email.ToString(), "Ваши данные для входа на сайт",
                "Логин: " + GetUsername(item,password) + " Пароль: " + password);
            return new JsonResult("Email Sended");
        }

        struct jsonFile
        {
            public string mail { get; set; }
            public string code { get; set; }

        }

        [HttpPost, Route("MailConfirm")]
        public bool MailConfirm([FromBody] string value)
        {
            jsonFile val = JsonConvert.DeserializeObject<jsonFile>(value);
            if (Auth.MailCode.TryGetValue(val.mail, out string mailcode))
            {
                if (val.code == mailcode)
                {
                    Auth.MailCode.Remove(val.mail);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        private string GetUsername(RequestVacancy item, string pass)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                string username = "";
                string[] mailSplit = item.Email.Split('@');
                string[] usernameSplit = mailSplit[0].Split('_');
                if (usernameSplit.Length > 0)
                {
                    foreach (var str in usernameSplit)
                    {
                        username += str;
                    }
                }
                else { username = mailSplit[0]; }
                var acc = db.Accounts.Where(x => x.Username == username).FirstOrDefault();
                if (acc == null)
                {
                    //Ф.И.О
                    string[] subString = item.Name.Split('.');
                    Account a = new Account();
                    a.Id = Guid.NewGuid();
                    a.Firstname = subString[1];
                    a.Lastname = subString[0];
                    a.Username = username;
                    a.Email = item.Email;
                    a.Password = pass;
                    //teacher
                    a.Role = "b2b90f26-4151-48ba-bd7a-1308d997ded2";
                    db.Accounts.Add(a);
                    db.SaveChanges();
                    return username;
                }
                else
                {
                    //Ф.И.О
                    string[] subString = item.Name.Split('.');
                    Account a = new Account();
                    a.Id = Guid.NewGuid();
                    a.Firstname = subString[1];
                    a.Lastname = subString[0];
                    a.Username = username + "1";
                    a.Email = item.Email;
                    a.Password = pass;
                    //teacher
                    a.Role = "b2b90f26-4151-48ba-bd7a-1308d997ded2";
                    db.Accounts.Add(a);
                    db.SaveChanges();
                    return username;
                }
            }
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.RequestVacancies.Remove(db.RequestVacancies.Where(x => x.Id == Guid.Parse(id)).FirstOrDefault());
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
