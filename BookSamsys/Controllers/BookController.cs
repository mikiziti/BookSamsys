using Microsoft.AspNetCore.Mvc;
using BookSamsys.Data;
using BookSamsys.Models;

namespace BookSamsys.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly BookSamsysDbContext dbContext;
        public BookController(BookSamsysDbContext dbContext) { 
            this.dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetBooks()
        {
           return  Ok(dbContext.Books.ToList());
            
        }
        [HttpPost]
        public IActionResult AddBook(AddBookRequest addBookRequest)
        {
           var book= new Book()
           {
               Isbn= addBookRequest.Isbn,
               Title= addBookRequest.Title,
               Author= addBookRequest.Author,
               Price= addBookRequest.Price,
               NumberOfPages= addBookRequest.NumberOfPages
            };
            dbContext.Books.Add(book);
            dbContext.SaveChanges();
            return Ok();
        }
        [HttpGet]
        [Route("/booksByIsbn/{isbn}")]
        public IActionResult GetBookByIsbn(int isbn)
        {
            var book = from b in dbContext.Books
                       where b.Isbn == isbn
                       select b;
            if(book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }
        [HttpGet]
        [Route("/booksByTitle/{title}")]
        public IActionResult GetBooksByTitle(string title)
        {
            var book = from b in dbContext.Books
                       where b.Title == title
                       select b;
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }
        [HttpGet]
        [Route("/booksByAuthor/{author}")]
        public IActionResult GetBooksByAuthor(string author)
        {
            var book = from b in dbContext.Books
                       where b.Author == author
                       select b;
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }
        [HttpGet]
        [Route("/booksByPrice/{price}")]
        public IActionResult GetBooksByPrice(float price)
        {
            var book = from b in dbContext.Books
                       where b.Price <= price
                       select b;
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }
        [HttpDelete]
        [Route("/deleteBook/{isbn}")]
        public IActionResult DeleteBook(int isbn)
        {
            var book = dbContext.Books.FirstOrDefault(b => b.Isbn == isbn);
            if (book != null)
            {
                dbContext.Books.Remove(book);
                dbContext.SaveChanges();
                return Ok();
            }

            return NotFound();
        }
        [HttpGet]
        [Route("/alphabeticOrder")]
        public IActionResult GetBooksAlphabeticOrder()
        {
            var book = from b in dbContext.Books
                       orderby b.Title
                       select b;
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }
        //ordenar por paginação
        [HttpGet]
        [Route("/pagination")]
        public IActionResult GetBooksPagination()
        {
            var book = dbContext.Books.OrderBy(book=>book.NumberOfPages);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

    }
}
