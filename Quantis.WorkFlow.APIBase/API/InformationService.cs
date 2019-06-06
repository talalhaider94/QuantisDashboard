using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Quantis.WorkFlow.APIBase.Framework;
using Quantis.WorkFlow.Models;
using Quantis.WorkFlow.Models.Information;
using Quantis.WorkFlow.Services.API;
using Quantis.WorkFlow.Services.DTOs.Information;
using Quantis.WorkFlow.Services.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Quantis.WorkFlow.APIBase.API
{
    public class InformationService : IInformationService
    {
        private readonly WorkFlowPostgreSqlContext _dbcontext;
        private readonly IMappingService<ConfigurationDTO, T_Configuration> _configurationMapper;
        public InformationService(WorkFlowPostgreSqlContext dbcontext, IMappingService<ConfigurationDTO, T_Configuration> configurationMapper)
        {
            _dbcontext = dbcontext;
            _configurationMapper = configurationMapper;
        }
        public void AddUpdateConfiguration(ConfigurationDTO dto)
        {
            try
            {
                var conf=_dbcontext.Configurations.Single(o => o.owner == dto.Owner && o.key == dto.Key);
                if (conf == null)
                {
                    conf = new T_Configuration();
                    conf = _configurationMapper.GetEntity(dto, conf);
                    _dbcontext.Configurations.Add(conf);
                }
                else
                {
                    conf = _configurationMapper.GetEntity(dto, conf);
                }
                _dbcontext.SaveChanges();                
                
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public void DeleteConfiguration(string owner, string key)
        {
            try
            {
                var conf = _dbcontext.Configurations.Single(o => o.owner == owner && o.key == key);
                if (conf != null)
                {
                    _dbcontext.Configurations.Remove(conf);
                    _dbcontext.SaveChanges();
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ConfigurationDTO GetConfiguration(string owner, string key)
        {
            try
            {
                var conf = _dbcontext.Configurations.Single(o => o.owner == owner && o.key == key);
                var dto = _configurationMapper.GetDTO(conf);
                return dto;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ConfigurationDTO> GetAllConfigurations()
        {
            try
            {
                var confs = _dbcontext.Configurations.Where(o=>o.isvisible);
                var dtos = _configurationMapper.GetDTOs(confs.ToList());
                return dtos;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<BaseNameCodeDTO> GetAllRoles()
        {
            try
            {
                var roles = _dbcontext.Roles.ToList();
                return roles.Select(o => new BaseNameCodeDTO(o.id, o.name, o.code)).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<BaseNameCodeDTO> GetAllPermissions()
        {
            try
            {
                var permission = _dbcontext.Permissions.ToList();
                return permission.Select(o => new BaseNameCodeDTO(o.id, o.name, o.code)).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<BaseNameCodeDTO> GetRolesByUserLogin(HttpContext context)
        {
            try
            {
                var user = context.User as AuthUser;
                var roles=_dbcontext.UserRoles.Include(o => o.Role).Where(q => q.user_id == user.UserId).Select(r=>r.Role).ToList();
                return roles.Select(o => new BaseNameCodeDTO(o.id, o.name, o.code)).ToList();

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<BaseNameCodeDTO> GetPermissionsByUserLogin(HttpContext context)
        {
            try
            {
                var user = context.User as AuthUser;
                var roles = _dbcontext.UserRoles.Where(q => q.user_id == user.UserId).Select(s => s.role_id).ToList();
                var permission=_dbcontext.RolePermissions.Include(o => o.Permission).Where(o => roles.Contains(o.role_id)).Select(p => p.Permission).ToList();
                return permission.Select(o => new BaseNameCodeDTO(o.id, o.name, o.code)).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<BaseNameCodeDTO> GetPermissionsByRoleID(int roleId)
        {
            try
            {
                var permissions = _dbcontext.RolePermissions.Include(o => o.Permission).Where(p => p.role_id == roleId).Select(o=>o.Permission);
                return permissions.Select(o => new BaseNameCodeDTO(o.id, o.name, o.code)).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void AssignRolesToUser(HttpContext context,List<int> roleIds)
        {
            try
            {
                var user = context.User as AuthUser;
                var roles=_dbcontext.UserRoles.Where(o => o.user_id == user.UserId);
                _dbcontext.UserRoles.RemoveRange(roles.ToArray());
                var userroles = roleIds.Select(o => new T_UserRole()
                {
                    role_id = o,
                    user_id = user.UserId
                });
                _dbcontext.UserRoles.AddRange(userroles.ToArray());
                _dbcontext.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void AssignPermissionsToRoles(int roleId, List<int> permissionIds)
        {
            try
            {
                var permissions = _dbcontext.RolePermissions.Where(o => o.role_id == roleId);
                _dbcontext.RolePermissions.RemoveRange(permissions.ToArray());
                var rolepermissions = permissionIds.Select(o => new T_RolePermission()
                {
                    role_id = roleId,
                    permission_id=o
                });
                _dbcontext.RolePermissions.AddRange(rolepermissions.ToArray());
                _dbcontext.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
