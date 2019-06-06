using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Quantis.WorkFlow.Services.API;
using Quantis.WorkFlow.Services.DTOs.Information;
using Quantis.WorkFlow.Services.Framework;

namespace Quantis.WorkFlow.Complete.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class InformationController : ControllerBase
    {
        private IInformationService _infomationAPI { get; set; }
        public InformationController(IInformationService infomationAPI)
        {
            _infomationAPI = infomationAPI;
        }
        [HttpGet("GetAllConfigurations")]
        public List<ConfigurationDTO> GetAllConfigurations()
        {
            return _infomationAPI.GetAllConfigurations();
        }
        [HttpGet("DeleteConfiguration")]
        public void DeleteConfiguration(string owner, string key)
        {
            _infomationAPI.DeleteConfiguration(owner,key);
        }
        [HttpPost("AddUpdateFormRule")]
        public void AddUpdateFormRule([FromBody]ConfigurationDTO dto)
        {
            _infomationAPI.AddUpdateConfiguration(dto);
        }

        [HttpGet("GetAllRoles")]
        public List<BaseNameCodeDTO> GetAllRoles()
        {
            return _infomationAPI.GetAllRoles();
        }

        [HttpGet("GetAllPermissions")]
        public List<BaseNameCodeDTO> GetAllPermissions()
        {
            return _infomationAPI.GetAllPermissions();
        }

        [HttpGet("GetRolesByUserLogin")]
        public List<BaseNameCodeDTO> GetRolesByUserLogin()
        {
            return _infomationAPI.GetRolesByUserLogin(HttpContext);
        }

        [HttpGet("GetPermissionsByUserLogin")]
        public List<BaseNameCodeDTO> GetPermissionsByUserLogin()
        {
            return _infomationAPI.GetPermissionsByUserLogin(HttpContext);
        }

        [HttpGet("GetPermissionsByRoleID")]
        public List<BaseNameCodeDTO> GetPermissionsByRoleID(int roleId)
        {
            return _infomationAPI.GetPermissionsByRoleID(roleId);
        }

        [HttpPost("AssignRolesToUser")]
        public void AssignRolesToUser([FromBody]List<int> roleIds)
        {
            _infomationAPI.AssignRolesToUser(HttpContext, roleIds);
        }

        [HttpPost("AssignRolesToUser")]
        public void AssignPermissionsToRoles([FromBody]int roleId, [FromBody]List<int> permissionIds)
        {
            _infomationAPI.AssignPermissionsToRoles(roleId, permissionIds);
        }

    }
}