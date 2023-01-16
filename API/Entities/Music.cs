

using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{

    [Table("Music")]
    public class Music
    {
         public int Id { get; set; }
        public string FileName { get; set; }
        public string Artist { get; set; }
        public string Description { get; set; }
        public string Tag { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
    }
}