using BookSamsys.DAL;
using BookSamsys.infrastructure.Entities;
using BookSamsys.Infrastructure.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookSamsys.DAL.Repositories;

public class AuthorRepository : GenericRepository<Author>, IAuthorRepository
{
    public AuthorRepository(BookSamsysDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Author>> GetAllAuthors()
    {
        return await FindAll().OrderBy(author => author.Name).ToListAsync();
    }

    public async Task<Author?> GetAuthorById(Guid authorId)
    {
        return await FindByCondition(author => author.Id.Equals(authorId)).FirstOrDefaultAsync();
    }

    public async Task<Author?> GetAuthorWithDetails(Guid authorId)
    {
        return await FindByCondition(author => author.Id.Equals(authorId)).Include(b => b.Books).FirstOrDefaultAsync();
    }

    public void CreateAuthor(Author author)
    {
        Create(author);
    }

    public void UpdateAuthor(Author author)
    {
        Update(author);
    }

    public void DeleteAuthor(Author author)
    {
        Delete(author);
    }
}