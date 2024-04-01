using Microsoft.EntityFrameworkCore;
using BookSamsys.Models;

namespace BookSamsys.Data
{
    public class BookSamsysDbContext: DbContext
    {
        public BookSamsysDbContext(DbContextOptions<BookSamsysDbContext> options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; }
    }
}
