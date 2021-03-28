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
    public class CommunicationController : ControllerBase
    {
        private readonly ILogger<CommunicationController> _logger;
        List<Communication> ItemList = new List<Communication>();

        public CommunicationController(ILogger<CommunicationController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Communications.OrderBy(x => x.CommunicationName).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        public JsonResult Insert(Communication item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = Guid.NewGuid();
                db.Communications.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Communication item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var value = db.Communications.Where(x => x.Id == item.Id).FirstOrDefault();
                if (value != null)
                {
                    value.CommunicationName = item.CommunicationName;
                    db.SaveChanges();
                }
            }
            return new JsonResult("Update Success");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Communications.Remove(db.Communications.Where(x => x.Id == Guid.Parse(id)).FirstOrDefault());
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }

    }
}
