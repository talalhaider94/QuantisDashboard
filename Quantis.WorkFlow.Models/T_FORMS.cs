using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Models
{
    public class T_FORM
    {
        public int form_id { get; set; }
        public string status { get; set; }
        public string prev_status { get; set; }
        public string form_name { get; set; }
        public string form_description { get; set; }
        public string form_schema { get; set; }
        public int reader_id { get; set; }
        public int form_owner_id { get; set; }
        public string form_error { get; set; }
        public DateTime create_date { get; set; }
        public DateTime modify_date { get; set; }

    }

    public class T_FORM_Configuration : IEntityTypeConfiguration<T_FORM>
    {
        public void Configure(EntityTypeBuilder<T_FORM> builder)
        {
            builder.ToTable("t_forms");
            builder.HasKey(o => o.form_id);
        }
    }
}
