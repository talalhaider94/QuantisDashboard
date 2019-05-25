using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Models
{
    public class T_GROUP
    {
        public int group_id { get; set; }
        public string group_description { get; set; }
        public DateTime create_date { get; set; }
        public DateTime? modify_date { get; set; }
        public DateTime? delete_date { get; set; }
    }
    public class T_GROUP_Configuration : IEntityTypeConfiguration<T_GROUP>
    {
        public void Configure(EntityTypeBuilder<T_GROUP> builder)
        {
            builder.ToTable("t_groups");
            builder.HasKey(o => o.group_id);
        }
    }
}
