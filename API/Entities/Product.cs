using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public  AppMusic Music { get; set; }
        public virtual Merchandise Merchandise { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public ICollection<ProductTag> Tags { get; set; }

       
    }
}