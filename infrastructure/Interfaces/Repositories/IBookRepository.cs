using BookSamsys.infrastructure.Entities;
using BookSamsys.infrastructure.Helpers;



namespace BookSamsys.Infrastructure.Interfaces.Repositories;

public interface IBookRepository : IGenericRepository<Book>
{
    Task<Pagination<Book>> GetAllBooks(BookParameters bookParameters);
    Task<Book?> GetBookById(Guid bookId);
    void CreateBook(Book book);
    void UpdateBook(Book book);
    void DeleteBook(Book book);
}