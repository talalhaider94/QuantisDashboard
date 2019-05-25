using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Quantis.WorkFlow.APIBase.API;
using Quantis.WorkFlow.APIBase.Framework;
using Quantis.WorkFlow.APIBase.Mappers;
using Quantis.WorkFlow.Models;
using Quantis.WorkFlow.Services.API;
using Quantis.WorkFlow.Services.DTOs.API;
using Quantis.WorkFlow.Services.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.APIBase
{
    public static class BaseAPIRegistry
    {
        public static void RegisterServices(IServiceCollection services)
        {
            RegisterAPIServices(services);
            RegisterMappers(services);
        }

        private static void RegisterAPIServices(IServiceCollection services)
        {
            services.AddTransient<ISampleAPI, SampleAPI>();
            services.AddTransient<IDataService, DataService>();
            services.AddTransient<IServiceDeskManagerService, ServiceDeskManagerService>();
            services.AddTransient<IOracleDataService, OracleDataService>();
            services.AddTransient<ISMTPService, SMTPService>();
        }
        public static void RegisterMappers(IServiceCollection services)
        {
            services.AddTransient<IMappingService<GroupDTO, T_GROUP>, GroupMapper>();
            services.AddTransient<IMappingService<UserDTO, Catalog_Users>, UserMapper>();
            services.AddTransient<IMappingService<PageDTO, T_PAGE>, PageMapper>();
            services.AddTransient<IMappingService<WidgetDTO, T_WIDGET>, WidgetMapper>();
            services.AddTransient<IMappingService<FormRuleDTO, T_FORM_Rule>, FormRuleMapper>();
            services.AddTransient<IMappingService<FormAttachmentDTO, T_FormAttachment>, FormAttachmentMapper>();
            services.AddTransient<IMappingService<CatalogKpiDTO, T_CATALOG_KPI>, CatalogKpiMapper>();
            services.AddTransient<IMappingService<KpiByFormIdDTO, T_CATALOG_KPI>, KpiByFormIdMapper>();
            services.AddTransient<IMappingService<ApiDetailsDTO, T_API_DETAILS>, ApiMapper>();
        }
    }
}
