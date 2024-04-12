namespace BookSamsys.infrastructure.Models.Book
{
    public class BookDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public int Isbn { get; set; } 
        public int AuthorId { get; set; }

        public float Price { get; set; }
        public string AuthorName { get; set; }



        public BookDTO()
        {
        }
        public BookDTO(Entities.Book book)
        {
            Id = book.Id;
            Title = book.Title;
            Isbn = book.Isbn;
            AuthorId = book.AuthorId;
            Price = book.Price;
            AuthorName = book.Author.Name;
            
        }
    }
}
