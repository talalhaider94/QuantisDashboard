using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Models
{
    public class T_NotifierLog
    {
        public int id { get; set; }
        public string id_form { get; set; }
        public DateTime notify_timestamp  { get; set; }
        public DateTime? remind_timestamp { get; set; }
        public bool is_ack { get; set; }
        public string period { get; set; }
        public int year { get; set; }

    }
    public class T_NotifierLog_Configuration : IEntityTypeConfiguration<T_NotifierLog>
    {
        public void Configure(EntityTypeBuilder<T_NotifierLog> builder)
        {
            builder.ToTable("t_notifier_log");
            builder.HasKey(o => o.id);
        }
    }
}
