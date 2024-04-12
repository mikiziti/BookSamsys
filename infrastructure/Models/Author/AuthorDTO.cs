using BookSamsys.infrastructure.Models.Book;


namespace BookSamsys.Infrastructure.Models.Author;

public class AuthorDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<BookDTO> Books { get; set; }
}