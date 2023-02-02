using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using API.DTOs;

namespace API.Data {

    public class OrdersRepository : IOrderRepository
    {
         private readonly DataContext _context;
        public OrdersRepository(DataContext context)
        {
            _context = context;
        }

     

        public Task<Order> GetOrderByUserNameAsync(string filename)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
             return await _context.Orders.ToListAsync();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }

        public void Update(Order order)
        {
            throw new NotImplementedException();
        }
    }
}