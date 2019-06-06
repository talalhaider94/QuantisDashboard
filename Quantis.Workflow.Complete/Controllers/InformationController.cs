using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Quantis.WorkFlow.Services.API;
using Quantis.WorkFlow.Services.DTOs.Information;

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
    }
}