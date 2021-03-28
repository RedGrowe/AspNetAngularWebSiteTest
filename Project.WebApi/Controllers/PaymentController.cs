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
    [Route("api/Payment")]
    public class PaymentController : Controller
    {

        [HttpPost]
        [Route("sendPaymentCode")]
        public JsonResult SendPaymentCode(Request item)
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("school.rus.lit@gmail.com", "goodIDEA1489"),
                EnableSsl = true
            };

            client.Send("school.rus.lit@gmail.com", item.Email.ToString(), "Код оплаты",
                "Введите данный код на сайте в разделе оплаты: 759261");
            return new JsonResult("Email Sended");
        }
    }
}
