﻿using Microsoft.EntityFrameworkCore;
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

        public DbSet<T_Group> Groups { get; set; }
        public DbSet<T_Widget> Widgets { get; set; }
        public DbSet<T_Page> Pages { get; set; }
        public DbSet<T_FormRule> FormRules { get; set; }
        public DbSet<T_Form> Forms { get; set; }
        public DbSet<T_Configuration> Configurations { get; set; }
        public DbSet<T_APIAuthentication> Authentication { get; set; }
        public DbSet<T_Exception> Exceptions { get; set; }
        public DbSet<T_CatalogUser> CatalogUsers { get; set; }
        public DbSet<T_Session> Sessions { get; set; }
        public DbSet<T_CatalogKPI> CatalogKpi { get; set; }
        public DbSet<T_APIDetail> ApiDetails { get; set; }
        public DbSet<T_FormAttachment> FormAttachments { get; set; }
        public DbSet<T_FormLog> FormLogs { get; set; }
        public DbSet<T_NotifierLog> NotifierLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            
            builder.ApplyConfiguration(new T_Group_Configuration());
            builder.ApplyConfiguration(new T_Page_Configuration());
            builder.ApplyConfiguration(new T_Widget_Configuration());
            builder.ApplyConfiguration(new T_Form_Configuration());
            builder.ApplyConfiguration(new T_FormRule_Configuration());
            builder.ApplyConfiguration(new T_APIAuthentication_Configuration());
            builder.ApplyConfiguration(new T_Configuration_Configuration());
            builder.ApplyConfiguration(new T_Exception_Configuration());
            builder.ApplyConfiguration(new T_CatalogUser_Configuration());
            builder.ApplyConfiguration(new T_Session_Configuration());
            builder.ApplyConfiguration(new T_CatalogKPI_Configuration());
            builder.ApplyConfiguration(new T_APIDetail_Configuration());
            builder.ApplyConfiguration(new T_FormAttachment_Configuration());
            builder.ApplyConfiguration(new T_FormLog_Configuration());
            builder.ApplyConfiguration(new T_NotifierLog_Configuration());
            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();

            updateUpdatedProperty<T_Group>();
            updateUpdatedProperty<T_Widget>();
            updateUpdatedProperty<T_Page>();
            updateUpdatedProperty<T_Form>();
            updateUpdatedProperty<T_FormRule>();
            updateUpdatedProperty<T_APIAuthentication>();
            updateUpdatedProperty<T_Configuration>();
            updateUpdatedProperty<T_Exception>();
            updateUpdatedProperty<T_CatalogUser>();
            updateUpdatedProperty<T_Session>();
            updateUpdatedProperty<T_CatalogKPI>();
            updateUpdatedProperty<T_APIDetail>();
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