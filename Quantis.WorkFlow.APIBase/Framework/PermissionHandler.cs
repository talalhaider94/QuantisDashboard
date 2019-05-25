using Microsoft.AspNetCore.Authorization;
using Quantis.WorkFlow.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Quantis.WorkFlow.APIBase.Framework
{
    public class UserTypeRequirement : IAuthorizationRequirement
    {
        public UserAuthorizationType Type { get; }

        public UserTypeRequirement(UserAuthorizationType type)
        {
            Type = type;
        }
    }
    public class MinimumAgeHandler : AuthorizationHandler<UserTypeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       UserTypeRequirement requirement)
        {

            var user = context.User as Quantis.WorkFlow.Services.Framework.AuthUser;

            if(user !=null && user.UserType>=requirement.Type)
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }
            return Task.CompletedTask;
        }
    }
}
