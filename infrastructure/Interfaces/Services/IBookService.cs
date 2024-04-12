using BookSamsys.infrastructure.Helpers;
using BookSamsys.infrastructure.Models.Book;

namespace BookSamsys.Infrastructure.Interfaces.Services;

public interface IBookService
{
    Task<MessagingHelper<Pagination<BookDTO>>> GetAllBooks(BookParameters bookParameters);

    Task<MessagingHelper<BookDTO>> GetBookById(Guid bookId);

    Task<MessagingHelper> CreateBook(CreateBookDTO createBookDto);

    Task<MessagingHelper> UpdateBook(Guid bookId, UpdateBookDTO book);

    Task<MessagingHelper> DeleteBook(Guid bookId);
}