using System;
using System.Collections.Generic;
using System.Text;
using Quantis.WorkFlow.APIBase.Framework;
using Quantis.WorkFlow.Models;
using Quantis.WorkFlow.Services.DTOs.API;

namespace Quantis.WorkFlow.APIBase.Mappers
{
    public class GroupMapper : MappingService<GroupDTO, T_GROUP>
    {
        public override GroupDTO GetDTO(T_GROUP e)
        {
            return new GroupDTO()
            {
                group_id = e.group_id,
                create_date = e.create_date,
                delete_date = e.delete_date,
                group_description = e.group_description,
                modify_date = e.modify_date
            };
        }

        public override T_GROUP GetEntity(GroupDTO o, T_GROUP e)
        {
            e.group_description = o.group_description;
            e.modify_date = o.modify_date;
            e.delete_date = o.delete_date;
            e.create_date = o.create_date;
            return e;
        }
    }
}
