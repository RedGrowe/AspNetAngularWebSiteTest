using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly ILogger<RoleController> _logger;
        List<Role> ItemList = new List<Role>();

        public RoleController(ILogger<RoleController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Roles.OrderBy(x => x.Id).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost, Route("GetRole")]
        public JsonResult GetRole([FromBody] string value)
        {
            Role rl = new Role();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                rl = db.Roles.Where(x => x.Id == Guid.Parse(value)).FirstOrDefault();
                return new JsonResult(rl);
            }
        }

        [HttpPost]
        public JsonResult Insert(Role item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = Guid.NewGuid();
                db.Roles.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Role item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var val = db.Roles.Where(x => x.Id == item.Id).FirstOrDefault();
                if (val != null)
                {
                    val.Name = item.Name;
                    db.SaveChanges();
                }
            }
            return new JsonResult("Update Success");
        }

        [HttpDelete]
        public JsonResult Delete(Role item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.SaveChanges();
            }
            return new JsonResult("Delete Success");
        }

    }
}
