using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Models.Information
{
    public class T_RolePermission
    {
        public int Id { get; set; }
        public int RoleID { get; set; }
        public int PermissionID { get; set; }
        public virtual T_Role Role { get; set; }
        public virtual T_Permission Permission { get; set; }
    }
}
