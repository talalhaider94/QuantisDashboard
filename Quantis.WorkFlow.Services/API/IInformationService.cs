using Quantis.WorkFlow.Services.DTOs.Information;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.API
{
    public interface IInformationService
    {
        List<ConfigurationDTO> GetAllConfigurations();
        void DeleteConfiguration(string owner, string key);
        void AddUpdateConfiguration(ConfigurationDTO dto);
        ConfigurationDTO GetConfiguration(string owner, string key);
    }
}
