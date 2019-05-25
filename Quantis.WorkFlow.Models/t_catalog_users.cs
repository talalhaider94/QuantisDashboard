using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Models
{
    public class Catalog_Users
    {
        public int id { get; set; }
        public string ca_bsi_account { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string organization { get; set; }
        public string mail { get; set; }
        public string userid { get; set; }
        public string manager { get; set; }
        public string password { get; set; }
        public bool user_admin { get; set; }
        public bool user_sadmin { get; set; }
    }
    public class Catalog_Users_Configuration : IEntityTypeConfiguration<Catalog_Users>
    {
        public void Configure(EntityTypeBuilder<Catalog_Users> builder)
        {
            builder.ToTable("t_catalog_users");
            builder.HasKey(o => new { o.userid, o.id });
        }
    }
}

