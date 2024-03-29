﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Quantis.WorkFlow.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Quantis.WorkFlow.APIBase.Framework
{
    public class QuantisPermissions : IAuthorizationRequirement
    {       
        public string Permission { get; }

        public QuantisPermissions(string permission)
        {
            Permission = permission;
        }
    }
    public class QuantisPermissionHandler : AuthorizationHandler<QuantisPermissions>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       QuantisPermissions requirement)
        {


            var user = context.User as Quantis.WorkFlow.Services.Framework.AuthUser;
            var filterContext = context.Resource as AuthorizationFilterContext;
            var response = filterContext.HttpContext.Response;
            if (user !=null && user.Permissions.Contains(requirement.Permission))
            {
                context.Succeed(requirement);
            }
            else
            {
                response.StatusCode = 401;
                return Task.CompletedTask;
            }
            return Task.CompletedTask;
        }
    }
}
