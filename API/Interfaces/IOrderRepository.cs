using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
         void Update(Order order);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<Order> GetOrderByUserNameAsync(string filename);
    }
}