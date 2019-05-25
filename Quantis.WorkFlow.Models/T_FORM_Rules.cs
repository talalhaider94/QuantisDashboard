using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Models
{
    public class T_FORM_Rule
    {
        public int id { get; set; }
        public int form_id { get; set; }
        public string form_body { get; set; }
        public DateTime start_date {get;set;}
        public DateTime end_date { get; set; }
    }
    public class T_FORM_Rule_Configuration : IEntityTypeConfiguration<T_FORM_Rule>
    {
        public void Configure(EntityTypeBuilder<T_FORM_Rule> builder)
        {
            builder.ToTable("t_form_rules");
            builder.HasKey(o => o.id);
            builder.Property(o => o.form_body).HasColumnType("jsonb");
        }
    }
}
