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
    public class AccountController : Controller
    {
        private readonly ILogger<Account> _logger;
        List<Account> ItemList = new List<Account>();


        public AccountController(ILogger<Account> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("login")]
        public JsonResult Login(Account item)
        {
            Account Item = new Account();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                Item = db.Accounts.Where(x => x.Username == item.Username && x.Password == item.Password).FirstOrDefault();
            }

            return new JsonResult(Item);
        }

        [HttpPost]
        public JsonResult Insert(Account item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = db.Accounts.Count() + 1;
                db.Accounts.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Account item)
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Accounts.ToList();
                for (int i = 0; i < ItemList.Count; i++)
                {
                    if (ItemList[i].Id == item.Id)
                    {
                        ItemList[i].Username = item.Username;
                        db.SaveChanges();
                    }
                }
            }

            return new JsonResult("Update Success");
        }


        [HttpDelete]
        public JsonResult Delete(Account item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Accounts.Remove(item);
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
