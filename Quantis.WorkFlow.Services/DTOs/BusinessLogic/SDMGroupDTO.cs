using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.DTOs.BusinessLogic
{
    public class SDMGroupDTO
    {
        public SDMGroupDTO(string handle,string name,string catagory)
        {
            GroupHandler = handle;
            GroupName = name;
            GroupCatagory = catagory;
        }
        public string GroupHandler { get; set; }
        public string GroupName { get; set; }
        public string GroupCatagory { get; set; }

    }
}
