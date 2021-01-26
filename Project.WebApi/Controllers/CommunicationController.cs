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
        List<Communication> CommunicationList = new List<Communication>();

        public CommunicationController(ILogger<CommunicationController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult GetAllCommunication()
        {
            CommunicationList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                CommunicationList = db.Communications.ToList();
            }

            return new JsonResult(CommunicationList);
        }

        [HttpPost]
        public JsonResult InsertCommunication(Communication Com)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                Com.CommunicationId = db.Communications.Count() + 1;
                db.Communications.Add(Com);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult UpdateCommunication(Communication com)
        {
            CommunicationList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                CommunicationList = db.Communications.ToList();
                for(int i = 0; i < CommunicationList.Count; i++)
                {
                    if(CommunicationList[i].CommunicationId == com.CommunicationId)
                    {
                        CommunicationList[i].CommunicationName = com.CommunicationName;
                        db.SaveChanges();
                    }
                }
            }

            return new JsonResult("Update Success");
        }


        [HttpDelete]
        public JsonResult DeleteCommunication(Communication Com)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Communications.Remove(Com);
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!");
        }

    }
}
