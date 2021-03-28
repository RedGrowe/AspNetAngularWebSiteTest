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
    public class VacancyController : Controller
    {
        private readonly ILogger<VacancyController> _logger;
        List<Vacancy> ItemList = new List<Vacancy>();

        public VacancyController(ILogger<VacancyController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Vacancies.OrderBy(x => x.VacancyName).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        public JsonResult Insert(Vacancy item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = Guid.NewGuid();
                db.Vacancies.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Vacancy item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var val = db.Vacancies.Where(x => x.Id == item.Id).FirstOrDefault();
                if (val != null)
                {
                    val.VacancyName = item.VacancyName;
                    val.Visibility = item.Visibility;
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
                db.Remove(db.Vacancies.Where(x => x.Id == Guid.Parse(id)).FirstOrDefault());
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
