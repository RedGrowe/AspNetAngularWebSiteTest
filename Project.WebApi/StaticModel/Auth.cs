using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebApi.StaticModel
{

    public static class Auth
    {
        public static Dictionary<string, Account> AuthList = new Dictionary<string, Account>();

        public static Dictionary<string, string> MailCode = new Dictionary<string, string>();
    }
}
