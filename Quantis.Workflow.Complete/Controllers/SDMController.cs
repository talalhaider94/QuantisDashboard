using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quantis.WorkFlow.Services.API;
using Quantis.WorkFlow.Services.DTOs.BusinessLogic;

namespace Quantis.WorkFlow.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class SDMController : ControllerBase
    {
        private IServiceDeskManagerService _sdmAPI;
        public SDMController(IServiceDeskManagerService sdmAPI)
        {
            _sdmAPI = sdmAPI;
        }
        [HttpGet("GetTicketDescriptionByUser")]
        public List<SDMTicketLVDTO> GetTicketDescriptionByUser(string name)
        {
            return _sdmAPI.GetTicketDescrptionByUser(name);
        }
        [HttpGet("GetAllTickets")]
        public List<SDMTicketLVDTO> GetAllTickets()
        {
            return _sdmAPI.GetAllTickets();
        }
        [HttpGet("TransferTicketByKPIID")]
        public SDMTicketLVDTO TransferTicketByKPIID(int id, string status, string description)
        {
            return _sdmAPI.TransferTicketByKPIID(id,status, description);
        }

        [HttpGet("EscalateTicketbyKPIID")]
        public SDMTicketLVDTO EscalateTicketbyKPIID(int id, string status, string description)
        {
            return _sdmAPI.EscalateTicketbyKPIID(id,status, description);
        }

        [HttpGet("CreateTicketByKPIID")]
        public SDMTicketLVDTO CreateTicketByKPIID(int id)
        {
            return _sdmAPI.CreateTicketByKPIID(id);
        }
    }
}