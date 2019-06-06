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
    }
}
