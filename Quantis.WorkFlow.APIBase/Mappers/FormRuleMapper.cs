using Quantis.WorkFlow.APIBase.Framework;
using Quantis.WorkFlow.Models;
using Quantis.WorkFlow.Services.DTOs.API;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.APIBase.Mappers
{
    public class FormRuleMapper : MappingService<FormRuleDTO, T_FORM_Rule>
    {
        public override FormRuleDTO GetDTO(T_FORM_Rule e)
        {
            return new FormRuleDTO()
            {
                id=e.id,
                form_id = e.form_id,
                form_body = e.form_body,
                end_date=e.end_date,
                start_date=e.start_date
            };
        }

        public override T_FORM_Rule GetEntity(FormRuleDTO o, T_FORM_Rule e)
        {
            e.form_body = o.form_body;
            e.end_date =o.end_date;
            e.start_date = o.start_date;
            return e;
        }
    }
}
