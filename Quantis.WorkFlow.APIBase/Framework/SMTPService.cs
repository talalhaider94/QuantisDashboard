using Microsoft.Extensions.Logging;
using Quantis.WorkFlow.APIBase.API;
using Quantis.WorkFlow.Services.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Quantis.WorkFlow.APIBase.Framework
{
    public class SMTPService : BaseService<SMTPService>, ISMTPService
    {
        private string from;
        private string sslTrust;
        private string senderPassword;
        private string senderUsername;
        private bool startTlsEnable;
        private Int32 serverPort;
        private string serverHost;
        private bool isAuth;        
        private string notifierAlias;
        

        public SMTPService(WorkFlowPostgreSqlContext context,
             ILogger<SMTPService> logger) : base(logger, context)
        {
            from = _dbcontext.Configurations.FirstOrDefault(o => o.owner == "be_notifier" && o.key == "notifier_from").value;
            sslTrust = _dbcontext.Configurations.FirstOrDefault(o => o.owner == "be_notifier" && o.key == "ssl_trust").value;
            senderPassword = _dbcontext.Configurations.FirstOrDefault(o => o.owner == "be_notifier" && o.key == "sender_password").value;
            senderUsername = _dbcontext.Configurations.FirstOrDefault(o => o.owner == "be_notifier" && o.key == "sender_username").value;
            startTlsEnable = bool.Parse(_dbcontext.Configurations.FirstOrDefault(o => o.owner == "be_notifier" && o.key == "is_start_tls_enable").value);
            serverPort = System.Convert.ToInt32(_dbcontext.Configurations.FirstOrDefault(o => o.owner == "be_notifier" && o.key == "server_port").value);
            serverHost = _dbcontext.Configurations.FirstOrDefault(o => o.owner == "be_notifier" && o.key == "server_host").value;
            isAuth = bool.Parse(_dbcontext.Configurations.FirstOrDefault(o => o.owner == "be_notifier" && o.key == "is_auth").value);
            notifierAlias = _dbcontext.Configurations.FirstOrDefault(o => o.owner == "be_notifier" && o.key == "notifier_alias").value;
        }


        public bool SendEmail(string subject, string body, List<string> recipients)
        {
            try
            {
                SmtpClient client = new SmtpClient(serverHost, serverPort);

                client.Credentials = new NetworkCredential(senderUsername, senderPassword);
                client.EnableSsl = startTlsEnable;

                MailMessage mailMessage = new MailMessage();

                MailAddress fromaddr = new MailAddress(from);
                mailMessage.From = fromaddr;

                foreach (string recipient in recipients)
                {
                    mailMessage.To.Add(recipient);
                }

                mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = body;
                mailMessage.Subject = subject;

                client.Send(mailMessage);
            }
            catch (Exception e)
            {
                LogException(e, LogLevel.Error);
                return false;
            }

            return true;
        }
    }
}
