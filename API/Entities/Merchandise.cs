using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Merchandise
    {
        public int Id { get; set; }
        
        public int ProductId { get; set; }
        public string ImageUrl { get; set; }

        // public Product Product { get; set; }
    }
}