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
        [Route("/addBook/")]
        public IActionResult AddBook(AddBookRequest addBookRequest)
        {
            if(dbContext.Books.Any(b=>b.Isbn==addBookRequest.Isbn))
            {
                ModelState.AddModelError("Isbn", "ISBN must be unique.");
                return BadRequest(ModelState);
            }
            if(addBookRequest.Price<0)
            {
                ModelState.AddModelError("Price", "Price cannot be negative.");
                return BadRequest(ModelState);
            }
            if(addBookRequest.NumberOfPages<0)
            {
                ModelState.AddModelError("NumberOfPages", "Number of pages cannot be negative.");
                return BadRequest(ModelState);
            }
           var book= new Book()
           {
               Isbn= addBookRequest.Isbn,
               Title= addBookRequest.Title,
               AuthorId= addBookRequest.AuthorId,
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
        [Route("/booksByAuthor/{authorId}")]
        public IActionResult GetBooksByAuthor(int authorId)
        {
            var book = from b in dbContext.Books
                       where b.AuthorId == authorId
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
        [HttpPut]
        [Route("/updateBook/{isbn}")]
        public IActionResult UpdateBook(int isbn, UpdateBookRequest updateBookRequest)
        {
            var book = dbContext.Books.FirstOrDefault(b => b.Isbn == isbn);
            if (book != null)
            {
                book.Title = updateBookRequest.Title;
                book.AuthorId =updateBookRequest.AuthorId;
                book.Price = updateBookRequest.Price;
                book.NumberOfPages = updateBookRequest.NumberOfPages;
                dbContext.SaveChanges();
                return Ok();
            }
            return NotFound();
        }

    }
}
