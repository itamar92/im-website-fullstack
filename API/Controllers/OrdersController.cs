using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
       private readonly DataContext _context;

        public OrdersController(DataContext context)
        {
            _context = context;
        }
    }
}