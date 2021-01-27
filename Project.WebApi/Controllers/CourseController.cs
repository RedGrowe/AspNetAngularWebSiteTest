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
                item.Id = db.Courses.Count() + 1;
                db.Courses.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Course item)
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Courses.ToList();
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
        public JsonResult Delete(Course item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Courses.Remove(item);
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
