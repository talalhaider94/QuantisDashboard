using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Models
{
    public class T_CUSTOMERS
    {
        public int customer_id { get; set; }
        public string status { get; set; } //('N','U','D') -- New, Updated, Deleted
        public string prev_status{ get; set; }
        public string customer_name { get; set; }
        public string customer_type_name { get; set; }
        public string customer_description { get; set; }
        public string customer_address { get; set; }
        public string customer_country { get; set; }
        public string customer_state { get; set; }
        public string customer_zipcode { get; set; }
        public string customer_contact { get; set; }
        public string customer_phone_number1 { get; set; }
        public string customer_phone_number2 { get; set; }
        public string customer_fax_number { get; set; }
        public string customer_mail_address { get; set; }
        public string customer_notes { get; set; }
        public string customer_registration_date { get; set; }
        public string customer_class { get; set; }
        public string seats { get; set; }
        public DateTime customer_create_date { get; set; }
        public DateTime customer_modify_date { get; set; }

    }
    public class T_CUSTOMERS_Configuration : IEntityTypeConfiguration<T_CUSTOMERS>
    {
        public void Configure(EntityTypeBuilder<T_CUSTOMERS> builder)
        {
            builder.ToTable("t_customers");
            builder.HasKey(o => o.customer_id);
        }
    }
}
