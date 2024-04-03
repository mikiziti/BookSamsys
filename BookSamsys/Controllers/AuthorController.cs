using Microsoft.AspNetCore.Mvc;
using BookSamsys.Data;
using BookSamsys.Models;

namespace BookSamsys.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : Controller
    {
        private readonly BookSamsysDbContext dbContext;
        public AuthorController(BookSamsysDbContext dbContext) {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetAuthors()
        {
            return  Ok(dbContext.Authors.ToList());
        }
        [HttpPost]
        public IActionResult AddAuthor(AddAuthorRequest addAuthorRequest)
        {
            var author = new Author
            {
                Name = addAuthorRequest.Name,
            };
            dbContext.Authors.Add(author);
            dbContext.SaveChanges();
            return Ok(author);  
        }

    }
}
