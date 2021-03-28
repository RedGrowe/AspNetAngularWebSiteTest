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
    public class RequestController : Controller
    {
        private readonly ILogger<RequestController> _logger;

        List<Request> ItemList = new List<Request>();

        public RequestController(ILogger<RequestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Requests.OrderBy(x => x.Name).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        public JsonResult Insert(Request item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = Guid.NewGuid();
                db.Requests.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success!");
        }

        [HttpPost]
        [Route("mail")]
        public JsonResult SendEmail(Request item)
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


        [HttpPut]
        public JsonResult Update(Request item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var val = db.Requests.Where(x => x.Id == item.Id).FirstOrDefault();
                if (val != null)
                {
                    val.Communicationname = item.Communicationname;
                    val.Coursename = item.Coursename;
                    val.Email = item.Email;
                    val.Mobilephone = item.Mobilephone;
                    val.Name = item.Name;
                    db.SaveChanges();
                }
            }
            return new JsonResult("Update Success2");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Requests.Remove(db.Requests.Where(x => x.Id == Guid.Parse(id)).FirstOrDefault());
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
