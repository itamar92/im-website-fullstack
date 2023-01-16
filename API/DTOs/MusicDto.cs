using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MusicDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Artist { get; set; }
        public string Description { get; set; }
        public Array Tag { get; set; }

    }
}