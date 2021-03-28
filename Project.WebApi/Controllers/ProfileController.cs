using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Project.WebApi.StaticModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : Controller
    {
        private readonly ILogger<ProfileController> _logger;
        List<ProfileInfo> ItemList = new List<ProfileInfo>();


        public ProfileController(ILogger<ProfileController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.ProfileInfos.OrderBy(x => x.Username).ToList();
            }

            return new JsonResult(ItemList);
        }

        struct jsonFile
        {
            public string first { get; set; }
            public string second { get; set; }

        }

        [HttpPost, Route("UpdateAboute")]
        public void UpdateAbout([FromBody] string obj)
        {
            jsonFile val = JsonConvert.DeserializeObject<jsonFile>(obj);
            if (Auth.AuthList.TryGetValue(val.first, out Account acc))
            {
                using (OnlineSchoolContext db = new OnlineSchoolContext())
                {
                    var pf = db.ProfileInfos.Where(x => x.Username == acc.Username).FirstOrDefault();

                    if (pf != null)
                    {
                        pf.AboutMe = val.second;
                        db.ProfileInfos.Update(pf);
                        db.SaveChanges();
                    }
                    else
                    {
                        pf = new ProfileInfo(acc.Username);
                        pf.AboutMe = val.second;
                        db.Add(pf);
                        db.SaveChanges();
                    }
                }
            }
        }

        [HttpPost, Route("UpdateProfileCTLink")]
        public JsonResult UpdateProfileCTLink([FromBody] string obj)
        {
            jsonFile val = JsonConvert.DeserializeObject<jsonFile>(obj);
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                CTLink ct = new CTLink();
                ct.Id = Guid.NewGuid();
                ct.IdCourse = Guid.Parse(val.first);
                ct.IdUser = Guid.Parse(val.second);
                db.Ctlinks.Add(ct);
                db.SaveChanges();
                return new JsonResult("Added CT");
            }
        }

        [HttpPost, Route("UpdateProfileByUsername")]
        public JsonResult UpdateProfileByUsername(ProfileInfo item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var pf = db.ProfileInfos.Where(x => x.Username == item.Username).FirstOrDefault();
                if (pf != null)
                {
                    pf.Course = item.Course;
                    pf.Grade = item.Grade;
                    pf.FirstConfirmed = item.FirstConfirmed;
                    pf.SecondConfirmed = item.SecondConfirmed;
                    pf.ThirdConfirmed = item.ThirdConfirmed;
                    pf.FourthConfirmed = item.FourthConfirmed;
                    pf.MainPhotoConfirmed = item.MainPhotoConfirmed;
                    db.SaveChanges();
                    return new JsonResult("Update Success");
                }
                else { return new JsonResult("Error"); }

            }
        }

        [HttpPost, Route("GetProfileByUsername")]
        public JsonResult GetProfileByUsername([FromBody] string value)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var pf = db.ProfileInfos.Where(x => x.Username == value).FirstOrDefault();
                if (pf != null)
                {
                    return new JsonResult(pf);
                }
                else { return new JsonResult("Error"); }
            }
        }

        [HttpPost, Route("GetProfile")]
        public JsonResult GetProfileByToken([FromBody] string value)
        {
            if (Auth.AuthList.TryGetValue(value, out Account acc) == true)
            {
                ProfileInfo pf = new ProfileInfo();
                ItemList.Clear();
                using (OnlineSchoolContext db = new OnlineSchoolContext())
                {

                    //Item = db.Accounts.Where(x => x.Username == item.Username && x.Password == item.Password).FirstOrDefault();
                    pf = db.ProfileInfos.Where(x => x.Username == acc.Username).FirstOrDefault();
                    return new JsonResult(pf);
                }
            }
            else
            {
                return new JsonResult("Error");
            }
        }

        [HttpPost]
        public JsonResult Insert(ProfileInfo item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.ProfileInfos.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(ProfileInfo item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var val = db.ProfileInfos.Where(x => x.Username == item.Username).FirstOrDefault();
                if (val != null)
                {
                    val.AboutMe = item.AboutMe;
                    val.Course = item.Course;
                    val.FirstConfirmed = item.FirstConfirmed;
                    val.FirstDoc = item.FirstDoc;
                    val.FourthConfirmed = item.FourthConfirmed;
                    val.FourthDoc = item.FourthDoc;
                    val.Grade = item.Grade;
                    val.MainPhoto = item.MainPhoto;
                    val.MainPhotoConfirmed = item.MainPhotoConfirmed;
                    val.SecondConfirmed = item.SecondConfirmed;
                    val.SecondDoc = item.SecondDoc;
                    val.ThirdConfirmed = item.ThirdConfirmed;
                    val.ThirdDoc = item.ThirdDoc;
                    db.SaveChanges();
                }
            }
            return new JsonResult("Update Success");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.ProfileInfos.ToList();
                //db.Communications.Remove(ItemList.FirstOrDefault(x => x.Username == id));
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
