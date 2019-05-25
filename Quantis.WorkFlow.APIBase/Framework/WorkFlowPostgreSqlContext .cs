using Microsoft.EntityFrameworkCore;
using Quantis.WorkFlow.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Quantis.WorkFlow.APIBase.Framework
{
    public class WorkFlowPostgreSqlContext : DbContext
    {
        public WorkFlowPostgreSqlContext(DbContextOptions<WorkFlowPostgreSqlContext> options) : base(options)
        {
        }

        public DbSet<T_GROUP> Groups { get; set; }
        public DbSet<T_WIDGET> Widgets { get; set; }
        public DbSet<T_PAGE> Pages { get; set; }
        public DbSet<T_FORM_Rule> FormRules { get; set; }
        public DbSet<T_FORM> Forms { get; set; }
        public DbSet<T_Configuration> Configurations { get; set; }
        public DbSet<T_APIAuthentication> Authentication { get; set; }
        public DbSet<T_Exception> Exceptions { get; set; }
        public DbSet<Catalog_Users> CatalogUsers { get; set; }
        public DbSet<T_Session> Sessions { get; set; }
        public DbSet<T_CATALOG_KPI> CatalogKpi { get; set; }
        public DbSet<T_API_DETAILS> ApiDetails { get; set; }
        public DbSet<T_FormAttachment> FormAttachments { get; set; }
        public DbSet<T_FormLog> FormLogs { get; set; }
        public DbSet<T_NotifierLog> NotifierLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            
            builder.ApplyConfiguration(new T_GROUP_Configuration());
            builder.ApplyConfiguration(new T_PAGE_Configuration());
            builder.ApplyConfiguration(new T_WIDGET_Configuration());
            builder.ApplyConfiguration(new T_FORM_Configuration());
            builder.ApplyConfiguration(new T_FORM_Rule_Configuration());
            builder.ApplyConfiguration(new T_APIAuthentication_Configuration());
            builder.ApplyConfiguration(new T_Configuration_Configuration());
            builder.ApplyConfiguration(new T_Exception_Configuration());
            builder.ApplyConfiguration(new Catalog_Users_Configuration());
            builder.ApplyConfiguration(new T_Session_Configuration());
            builder.ApplyConfiguration(new T_CATALOG_KPI_Configuration());
            builder.ApplyConfiguration(new T_API_DETAILS_Configuration());
            builder.ApplyConfiguration(new T_FormAttachment_Configuration());
            builder.ApplyConfiguration(new T_FormLog_Configuration());
            builder.ApplyConfiguration(new T_NotifierLog_Configuration());
            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();

            updateUpdatedProperty<T_GROUP>();
            updateUpdatedProperty<T_WIDGET>();
            updateUpdatedProperty<T_PAGE>();
            updateUpdatedProperty<T_FORM>();
            updateUpdatedProperty<T_FORM_Rule>();
            updateUpdatedProperty<T_APIAuthentication>();
            updateUpdatedProperty<T_Configuration>();
            updateUpdatedProperty<T_Exception>();
            updateUpdatedProperty<Catalog_Users>();
            updateUpdatedProperty<T_Session>();
            updateUpdatedProperty<T_CATALOG_KPI>();
            updateUpdatedProperty<T_API_DETAILS>();
            updateUpdatedProperty<T_FormAttachment>();
            updateUpdatedProperty<T_FormLog>();
            updateUpdatedProperty<T_NotifierLog>();
            return base.SaveChanges();
        }

        private void updateUpdatedProperty<T>() where T : class
        {
            var modifiedSourceInfo =
                ChangeTracker.Entries<T>()
                    .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);
        }
    }
}
