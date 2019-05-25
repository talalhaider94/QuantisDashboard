using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.Framework
{
    public class AuthUser:System.Security.Claims.ClaimsPrincipal
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public UserAuthorizationType UserType { get; set; }
    }
}
