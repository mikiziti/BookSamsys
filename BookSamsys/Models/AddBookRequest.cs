namespace BookSamsys.Models
{
    public class AddBookRequest
    {
        //unique identifier for books
        public int Isbn { get; set; }
        //name of the book
        public string Title { get; set; }
        //person who wrote the book

        public string Author { get; set; }
        //cost of the book
        public float Price { get; set; }
        //number of pages in the book
        public int NumberOfPages { get; set; }
    }
}
