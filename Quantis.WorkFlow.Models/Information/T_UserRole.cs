using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Models.Information
{
    public class T_UserRole
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public int RoleID { get; set; }
        public virtual T_Role Role { get; set; }
    }
}
