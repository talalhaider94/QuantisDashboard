﻿using Quantis.WorkFlow.Services.DTOs.BusinessLogic;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.API
{
    public interface IServiceDeskManagerService
    {
        List<SDMTicketLVDTO> GetAllTickets();
        List<SDMTicketLVDTO> GetTicketDescrptionByUser(string username);
        SDMTicketLVDTO CreateTicket(CreateTicketDTO dto);
        SDMTicketLVDTO CreateTicketByKPIID(int Id);
        SDMTicketLVDTO GetTicketByKPIID(int Id);
        SDMTicketLVDTO TransferTicketByKPIID(int id,string status, string description);
        SDMTicketLVDTO EscalateTicketbyKPIID(int id, string status,string description);
        string UploadAttachmentToTicket(int ticketId, string docName, byte[] docContent);

        byte[] DownloadAttachment(string attachmentHandle);
        List<SDMAttachmentDTO> GetAttachmentsByTicket(int ticketId);
        List<SDMTicketLogDTO> GetTicketHistory(int ticketId);
    }
}
