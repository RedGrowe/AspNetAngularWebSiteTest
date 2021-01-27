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
                ItemList = db.Roles.OrderBy(x => x.RoleId).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        public JsonResult Insert(Role item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.RoleId = db.Roles.Count() + 1;
                db.Roles.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Role item)
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Roles.ToList();
                for (int i = 0; i < ItemList.Count; i++)
                {
                    if (ItemList[i].RoleId == item.RoleId)
                    {
                        ItemList[i].RoleName = item.RoleName;
                        db.SaveChanges();
                    }
                }
            }

            return new JsonResult("Update Success");
        }

        [HttpDelete]
        public JsonResult Delete(Role item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Roles.Remove(item);
                db.SaveChanges();
            }
            return new JsonResult("Delete Success");
        }

    }
}
