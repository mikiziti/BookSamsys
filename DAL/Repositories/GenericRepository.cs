using System.Linq.Expressions;
using BookSamsys.infrastructure.Entities;
using BookSamsys.Infrastructure.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookSamsys.DAL.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private BookSamsysDbContext BookSamsysDbContext { get; set; }

    protected GenericRepository(BookSamsysDbContext repositoryContext)
    {
        BookSamsysDbContext = repositoryContext;
    }

    public IQueryable<T> FindAll()
    {
        return BookSamsysDbContext.Set<T>().AsNoTracking();
    }

    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
    {
        return BookSamsysDbContext.Set<T>().Where(expression).AsNoTracking();
    }

    public void Create(T entity)
    {
        BookSamsysDbContext.Set<T>().Add(entity);
    }

    public void Update(T entity)
    {
        BookSamsysDbContext.Set<T>().Update(entity);
    }

    public void Delete(T entity)
    {
        BookSamsysDbContext.Set<T>().Remove(entity);
    }
    protected IQueryable<Book> FindAllWithAuthorName()
    {
        return BookSamsysDbContext.Books
            .Include(book => book.Author)
            .AsNoTracking();
    }
}