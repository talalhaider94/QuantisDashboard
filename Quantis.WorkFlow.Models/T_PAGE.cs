using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Models
{
    public class T_PAGE
    {
        public int page_id { get; set; }
        public string page_name { get; set; }
        public int page_sequence { get; set; }
        public int user_id { get; set; }
    }
    public class T_PAGE_Configuration : IEntityTypeConfiguration<T_PAGE>
    {
        public void Configure(EntityTypeBuilder<T_PAGE> builder)
        {
            builder.ToTable("t_pages");
            builder.HasKey(o => o.page_id);
        }
    }
}
