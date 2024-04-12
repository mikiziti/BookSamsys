using BookSamsys.Infrastructure.Interfaces.Repositories;

namespace BookSamsys.Infrastructure.Interfaces.Repositories;

public interface IUnitOfWork
{
    IAuthorRepository AuthorRepository { get; }
    IBookRepository BookRepository { get; }
    Task SaveAsync();
}