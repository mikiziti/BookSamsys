
using Microsoft.EntityFrameworkCore;
using BookSamsys.infrastructure.Entities;
using BookSamsys.infrastructure.Helpers;
using BookSamsys.Infrastructure.Interfaces.Repositories;


namespace BookSamsys.DAL.Repositories;

public class BookRepository : GenericRepository<Book>, IBookRepository
{
    public BookRepository(BookSamsysDbContext context)
            : base(context)
    {
    }

    public async Task<Pagination<Book>> GetAllBooks(BookParameters bookParameters)
    {
        IQueryable<Book> books = FindAllWithAuthorName();

        SearchByIsbn(ref books, bookParameters.Isbn);
        SearchByAuthor(ref books, bookParameters.AuthorId);
        if (bookParameters.Title != null) SearchByName(ref books, bookParameters.Title);

        return await Pagination<Book>.ToPagedList(books, bookParameters.PageNumber, bookParameters.PageSize);
    }

    public async Task<Book?> GetBookById(Guid bookId)
    {
        return await FindByCondition(book => book.Id.Equals(bookId)).FirstOrDefaultAsync();
    }

    public void CreateBook(Book book)
    {
        Create(book);
    }

    public void UpdateBook(Book book)
    {
        Update(book);
    }

    public void DeleteBook(Book book)
    {
        Delete(book);
    }
    private static void SearchByIsbn(ref IQueryable<Book> books, int isbn)
    {
        if (!books.Any() || isbn == 0)
            return;
        books = books.Where(o => o.Isbn == isbn);
    }

    private static void SearchByName(ref IQueryable<Book> books, string bookName)
    {
        if (!books.Any() || string.IsNullOrWhiteSpace(bookName))
            return;
        books = books.Where(o => o.Title.ToLower().Contains(bookName.Trim().ToLower()));
    }

    private static void SearchByAuthor(ref IQueryable<Book> books, Guid authorId)
    {
        if (!books.Any() || authorId == Guid.Empty)
            return;
        books = books.Where(o => o.AuthorId.Equals(authorId));
    }
}