using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Project.WebApi.StaticModel;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Project.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly ILogger<Account> _logger;
        private readonly IWebHostEnvironment _env;
        List<Account> ItemList = new List<Account>();


        public AccountController(ILogger<Account> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        [HttpGet]
        [Authorize]
        public JsonResult Get()
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Accounts.OrderBy(x => x.Id).ToList();
            }

            return new JsonResult(ItemList);
        }

        [HttpPost]
        [Route("login")]
        public JsonResult Login(AccountDTO item)
        {
            AccountDTO Item = new AccountDTO();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                var user = db.Accounts.Where(x => x.Username == item.Username && x.Password == item.Password).FirstOrDefault();
                Item.Firstname = user.Firstname;
                Item.Lastname = user.Lastname;
                Item.Password = user.Password;
                Item.Id = user.Id.ToString();
                Item.Role = user.Role;
                Item.Username = user.Username;
                Item.Email = user.Email;
            }

            return new JsonResult(Item);
        }

        [HttpPost]
        [Route("token")]
        public IActionResult Token(Account item)
        {
            Account Item = new Account();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                Item = db.Accounts.Where(x => x.Username == item.Username && x.Password == item.Password).FirstOrDefault();
                if (Item != null)
                {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var tokenOptions = new JwtSecurityToken(
                        issuer: "https://localhost:5001",
                        audience: "https://localhost:5001",
                        claims: new List<Claim>(),
                        expires: DateTime.Now.AddMinutes(5),
                        signingCredentials: signingCredentials);
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                    if (!Auth.AuthList.ContainsKey(tokenString)) { Auth.AuthList.Add(tokenString, Item); }
                    return Ok(new { Token = tokenString });
                }
                return Unauthorized();
            }
        }

        [HttpPost, Route("GetAccount")]
        public JsonResult GetAccount([FromBody] string value)
        {
            Auth.AuthList.TryGetValue(value, out Account Item);
            return new JsonResult(Item);
        }

        [HttpPost, Route("RemoveToken")]
        public void RemoveToken([FromBody] string value)
        {
            Auth.AuthList.Remove(value);
        }

        [HttpPost, Route("SaveFile")]
        public JsonResult SaveFile()
        {
            try
            {
                //Auth.AuthList.TryGetValue(value, out Account Item);
                var httpRequset = Request.Form;
                var posterFile = httpRequset.Files[0];
                string filename = posterFile.FileName;
                string[] subString = filename.Split('_');
                string[] secondSubString = subString[subString.Length - 1].Split('.');
                string UserName = subString[0];
                string DocType = subString[1];
                string DocPath = UserName + "_" + DocType + "." + secondSubString[secondSubString.Length - 1];
                var physicalPath = _env.ContentRootPath + "/Photos/" + UserName + "_" + DocType + "." + secondSubString[secondSubString.Length - 1];
                Console.WriteLine("Path:" + physicalPath);
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    posterFile.CopyTo(stream);
                }

                using (OnlineSchoolContext db = new OnlineSchoolContext())
                {
                    ProfileInfo pf = new ProfileInfo();
                    pf = db.ProfileInfos.Where(x => x.Username == UserName).FirstOrDefault();
                    if (pf != null)
                    {
                        switch (DocType)
                        {
                            case "MainPhoto":
                                pf.MainPhoto = DocPath;
                                break;
                            case "FirstDoc":
                                pf.FirstDoc = DocPath;
                                break;
                            case "SecondDoc":
                                pf.SecondDoc = DocPath;
                                break;
                            case "ThirdDoc":
                                pf.ThirdDoc = DocPath;
                                break;
                            case "FourthDoc":
                                pf.FourthDoc = DocPath;
                                break;
                        }
                        db.Update(pf);
                        db.SaveChanges();
                    }
                    else
                    {
                        pf = new ProfileInfo(UserName);
                        switch (DocType)
                        {
                            case "MainPhoto":
                                pf.MainPhoto = DocPath;
                                break;
                            case "FirstDoc":
                                pf.FirstDoc = DocPath;
                                break;
                            case "SecondDoc":
                                pf.SecondDoc = DocPath;
                                break;
                            case "ThirdDoc":
                                pf.ThirdDoc = DocPath;
                                break;
                            case "FourthDoc":
                                pf.FourthDoc = DocPath;
                                break;
                        }
                        db.Add(pf);
                        db.SaveChanges();
                    }
                }
                return new JsonResult(filename);

            }
            catch (Exception)
            {
                return new JsonResult("Error");
            }
        }

        [HttpPost, Route("CheckToken")]
        public async Task<bool> CheckToken([FromBody] string value)
        {
            bool isValid = await Task.Run(() => Validation(value));
            return isValid;
        }

        private bool Validation(string value)
        {
            string[] splt = value.Split('+');
            if (Auth.AuthList.TryGetValue(splt[0], out Account item))
            {
                using (OnlineSchoolContext db = new OnlineSchoolContext())
                {
                    Role rl = new Role();
                    rl = db.Roles.Where(x => x.Name == splt[1]).FirstOrDefault();
                    if (rl != null)
                    {
                        if (Guid.Parse(item.Role) == rl.Id)
                        {
                            return true;
                        }
                        else { return false; }
                    }
                    else { return false; }
                }
            }
            else { return false; }
            //if (Auth.AuthList.ContainsKey(value))
            //    return true;
            //else
            //    return false;
        }

        [HttpPost]
        public JsonResult Insert(Account item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                item.Id = Guid.NewGuid();
                db.Accounts.Add(item);
                db.SaveChanges();
            }
            return new JsonResult("Added Success");
        }

        [HttpPut]
        public JsonResult Update(Account item)
        {
            ItemList.Clear();
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                ItemList = db.Accounts.ToList();
                for (int i = 0; i < ItemList.Count; i++)
                {

                    if (ItemList[i].Id == item.Id)
                    {
                        ItemList[i] = item;
                        db.Update(item);
                        db.SaveChanges();
                    }
                }
            }

            return new JsonResult("Update Success");
        }


        [HttpDelete]
        public JsonResult Delete(Account item)
        {
            using (OnlineSchoolContext db = new OnlineSchoolContext())
            {
                db.Accounts.Remove(item);
                db.SaveChanges();
            }
            return new JsonResult("Delete Success!!");
        }
    }
}
