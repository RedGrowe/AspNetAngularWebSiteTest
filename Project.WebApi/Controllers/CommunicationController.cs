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
                ItemList = db.Communications.OrderBy(x => x.CommunicationId).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        public JsonResult Insert(Communication item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.CommunicationId = db.Communications.Count() + 1;
                db.Communications.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Communication item)
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Communications.ToList();
                for (int i = 0; i < ItemList.Count; i++)
                {
                    if (ItemList[i].CommunicationId == item.CommunicationId)
                    {
                        ItemList[i].CommunicationName = item.CommunicationName;
                        db.SaveChanges();
                    }
                }
            }
            return new JsonResult("Update Success");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Communications.ToList();
                db.Communications.Remove(ItemList.FirstOrDefault(x => x.CommunicationId == id));
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }

    }
}
