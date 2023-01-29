

using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{

    [Table("Music")]
    public class AppMusic
    {
        public int Id { get; set; }
        public string filename { get; set; }
        public string artist { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public string public_id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}