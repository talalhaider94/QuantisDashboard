using Quantis.WorkFlow.APIBase.Framework;
using Quantis.WorkFlow.Models;
using Quantis.WorkFlow.Services.DTOs.API;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.APIBase.Mappers
{
    public class KpiByFormIdMapper : MappingService<KpiByFormIdDTO, T_CATALOG_KPI>
    {
        public override KpiByFormIdDTO GetDTO(T_CATALOG_KPI e)
        {
            return new KpiByFormIdDTO()
            {
                id_kpi = e.id_kpi,
                contract = e.contract
            };
        }

        public override T_CATALOG_KPI GetEntity(KpiByFormIdDTO o, T_CATALOG_KPI e)
        {
            e.contract = o.contract;
            return e;
        }
    }
}
