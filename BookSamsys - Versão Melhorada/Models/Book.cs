﻿using System.ComponentModel.DataAnnotations;

namespace BookSamsys.Models
{
    public class Book
    {
        public int Id { get; set; }

        //unique identifier for books
        public int Isbn { get; set; }
        //name of the book
        public string Title { get; set; }
        //person who wrote the book
        public int AuthorId { get; set; }
        //cost of the book
        public float Price { get; set; }

        public int NumberOfPages { get; set; }
    }
}
