using Microsoft.Extensions.Logging;
using Quantis.WorkFlow.APIBase.Framework;
using Quantis.WorkFlow.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.APIBase.API
{
    public class BaseService<T>
    {
        protected ILogger<T> _logger { get; set; }
        protected WorkFlowPostgreSqlContext _dbcontext { get; set; }

        public BaseService(ILogger<T> logger, WorkFlowPostgreSqlContext context)
        {
            _logger = logger;
            _dbcontext = context;
        }
        public void LogException(Exception e, LogLevel l)
        {
            try{
                _logger.Log(l, e.Message + ">>>>>>" + e.InnerException ?? e.InnerException.Message + ">>>>>>" + e.StackTrace);
                var exception = new T_Exception()
                {
                    message = e.Message.Substring(0, Math.Min(999, e.Message.Length)),
                    stacktrace = e.StackTrace.Substring(0, Math.Min(999, e.StackTrace.Length)),
                    loglevel = l.ToString()
                };
                var inner_exception = e.InnerException;
                while (inner_exception != null)
                {
                    exception.innerexceptions += ">>>>>>" + inner_exception.Message;
                    inner_exception = inner_exception.InnerException;
                }
                exception.innerexceptions = (exception.innerexceptions != null) ? exception.innerexceptions.Substring(0, Math.Min(1000, exception.innerexceptions.Length)) : null;
                _dbcontext.Exceptions.Add(exception);
                _dbcontext.SaveChanges();
            }
            catch(Exception)
            {
                return;
            }
            
        } 
    }
}
