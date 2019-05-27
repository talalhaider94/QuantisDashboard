using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using Quantis.WorkFlow.APIBase.API;
using Quantis.WorkFlow.APIBase.Framework;
using Quantis.WorkFlow.Services;
using Quantis.WorkFlow.Services.API;

namespace Quantis.Workflow.Complete
{
    public class Startup
    {
        public class LowercaseNamingStrategy : NamingStrategy
        {
            protected override string ResolvePropertyName(string name)
            {
                return name.ToLowerInvariant();
            }
        }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver { NamingStrategy = new LowercaseNamingStrategy() });
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            var sqlConnectionString = Configuration.GetConnectionString("DataAccessPostgreSqlProvider");
            Quantis.WorkFlow.APIBase.BaseAPIRegistry.RegisterServices(services);
            services.AddDbContext<WorkFlowPostgreSqlContext>(options =>
                options.UseLazyLoadingProxies().UseNpgsql(
                    sqlConnectionString,
                    b => b.MigrationsAssembly("AspNet5MultipleProject")
                )
            ).BuildServiceProvider();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });
            RegisterServices(services);
            services.AddAuthorization(options =>
            {
                options.AddPolicy(WorkFlowPermissions.SUPERADMIN, policy =>
                    policy.Requirements.Add(new UserTypeRequirement(UserAuthorizationType.SuperAdmin)));
                options.AddPolicy(WorkFlowPermissions.ADMIN, policy =>
                    policy.Requirements.Add(new UserTypeRequirement(UserAuthorizationType.Admin)));
                options.AddPolicy(WorkFlowPermissions.USER, policy =>
                    policy.Requirements.Add(new UserTypeRequirement(UserAuthorizationType.User)));
            });

            services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();

        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseSpaStaticFiles();
            app.UseCors("AllowOrigin");
            app.UseWhen(x => (x.Request.Path.StartsWithSegments("/api", StringComparison.OrdinalIgnoreCase)),
            builder =>
            {
                builder.UseMiddleware<AuthenticationMiddleware>();
            });
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }

        private void RegisterServices(IServiceCollection services)
        {
        }
    }
}
