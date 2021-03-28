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
    public class SchoolInfoController : Controller
    {
        private readonly ILogger<SchoolInfoController> _logger;
        List<SchoolInfo> ItemList = new List<SchoolInfo>();

        public SchoolInfoController(ILogger<SchoolInfoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            SchoolInfo si = new SchoolInfo();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                if (db.SchoolInfos.ToList().Count > 0)
                {
                    si = db.SchoolInfos.ToList()[0];
                }
            }
            if (si != null) { return new JsonResult(si); }
            else { return new JsonResult("error"); }
        }

        [HttpPost]
        public JsonResult Insert(SchoolInfo item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = Guid.NewGuid();
                db.SchoolInfos.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(SchoolInfo item)
        {
            if (item.Id == Guid.Empty)
            {
                using (OnlineSchoolContext db = new OnlineSchoolContext())
                {
                    item.Id = Guid.NewGuid();
                    db.SchoolInfos.Add(item);
                    db.SaveChanges();
                }
            }
            else
            {
                using (OnlineSchoolContext db = new OnlineSchoolContext())
                {
                    var val = db.SchoolInfos.Where(x => x.Id == item.Id).FirstOrDefault();
                    if (val != null)
                    {
                        val.ContactAbout = item.ContactAbout;
                        val.SchoolAbout = item.SchoolAbout;
                        db.SaveChanges();
                    }
                }
            }
            return new JsonResult("Update Success");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Remove(db.SchoolInfos.Where(x => x.Id == Guid.Parse(id)).FirstOrDefault());
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
