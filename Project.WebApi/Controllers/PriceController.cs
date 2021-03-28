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
    public class PriceController : Controller
    {


        private readonly ILogger<PriceController> _logger;
        List<Price> ItemList = new List<Price>();

        public PriceController(ILogger<PriceController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Prices.OrderBy(x => x.Id).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        public JsonResult Insert(Price item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = Guid.NewGuid();
                db.Prices.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Price item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var val = db.Prices.Where(x => x.Id == item.Id).FirstOrDefault();
                if (val != null)
                {
                    val.Course = item.Course;
                    val.EighthPrice = item.EighthPrice;
                    val.FifthPrice = item.FifthPrice;
                    val.FirstPrice = item.FirstPrice;
                    val.FourthPrice = item.FourthPrice;
                    val.SecondPrice = item.SecondPrice;
                    val.SeventhPrice = item.SeventhPrice;
                    val.SixthPrice = item.SixthPrice;
                    val.Subjetct = item.Subjetct;
                    val.ThirdPrice = item.ThirdPrice;
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
                db.Remove(db.Prices.Where(x => x.Id == Guid.Parse(id)).FirstOrDefault());
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
