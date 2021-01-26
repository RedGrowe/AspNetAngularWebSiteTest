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
        List<Role> RoleList = new List<Role>();

        public RoleController(ILogger<RoleController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult GetAllRole()
        {
            RoleList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                RoleList = db.Roles.OrderBy(x => x.RoleId).ToList();
            }

            return new JsonResult(RoleList);
        }

        [HttpPost]
        public JsonResult InsertRole(Role newRole)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                newRole.RoleId = db.Roles.Count() + 1;
                db.Roles.Add(newRole);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult UpdateRole(Role role)
        {
            RoleList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                RoleList = db.Roles.ToList();
                for (int i = 0; i < RoleList.Count; i++)
                {
                    if (RoleList[i].RoleId == role.RoleId)
                    {
                        RoleList[i].RoleName = role.RoleName;
                        db.SaveChanges();
                    }
                }
            }

            return new JsonResult("Update Success");
        }

        [HttpDelete]
        public JsonResult DeleteRole(Role role)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Roles.Remove(role);
                db.SaveChanges();
            }
            return new JsonResult("Delete Success");
        }

    }
}
