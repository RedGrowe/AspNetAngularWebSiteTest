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
    public class CourseController : Controller
    {
        private readonly ILogger<CourseController> _logger;
        List<Course> ItemList = new List<Course>();

        public CourseController(ILogger<CourseController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Courses.OrderBy(x => x.Id).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        public JsonResult Insert(Course item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = Guid.NewGuid();
                db.Courses.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Course item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var val = db.Courses.Where(x => x.Id == item.Id).FirstOrDefault();
                if (val != null)
                {
                    val.Name = item.Name;
                    val.GroupNumber = item.GroupNumber;
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
                ItemList = db.Courses.ToList();
                db.Remove(db.Courses.Where(x => x.Id == Guid.Parse(id)).FirstOrDefault());
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
