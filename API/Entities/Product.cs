using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string filename { get; set; }
        public string artist { get; set; }
        public string description { get; set; }
        public int quantity { get; set; }
        public decimal price { get; set; }
        public string url { get; set; }
        public string public_id { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<ProductTag> Tags { get; set; }


    }
}