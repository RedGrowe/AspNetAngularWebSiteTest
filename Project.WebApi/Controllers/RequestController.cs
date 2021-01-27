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
                ItemList = db.Requests.OrderBy(x => x.Id).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        public JsonResult Insert(Request item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = db.Requests.Count() + 1;
                db.Requests.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success!");
        }

        [HttpPut]
        public JsonResult Update(Request item)
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Requests.ToList();
                for (int i = 0; i < ItemList.Count; i++)
                {
                    if (ItemList[i].Id == item.Id)
                    {
                        ItemList[i].Name = item.Name;
                        db.SaveChanges();
                    }
                }
            }

            return new JsonResult("Update Success");
        }


        [HttpDelete]
        public JsonResult Delete(Request item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Requests.Remove(item);
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
