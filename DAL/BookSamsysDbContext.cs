using Microsoft.EntityFrameworkCore;
using BookSamsys.infrastructure.Entities;

namespace BookSamsys.DAL
{
    public class BookSamsysDbContext : DbContext
    {
        public BookSamsysDbContext(DbContextOptions<BookSamsysDbContext> options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
    }
}
