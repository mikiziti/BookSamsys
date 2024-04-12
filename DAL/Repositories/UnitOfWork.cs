
using BookSamsys.Infrastructure.Interfaces.Repositories;

namespace BookSamsys.DAL.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly BookSamsysDbContext _context;
    private IAuthorRepository? _author;
    private IBookRepository? _book;

    public IBookRepository BookRepository
    {
        get
        {
            if (_book == null)
            {
                _book = new BookRepository(_context);
            }

            return _book;
        }
    }

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }

    public IAuthorRepository AuthorRepository
    {
        get
        {
            if (_author == null)
            {
                _author = new AuthorRepository(_context);
            }

            return _author;
        }
    }

    public UnitOfWork(BookSamsysDbContext repositoryContext)
    {
        _context = repositoryContext;
    }
}