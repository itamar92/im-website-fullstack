using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class MusicDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Artist { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }

    }
}