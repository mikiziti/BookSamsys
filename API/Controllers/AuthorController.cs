
using BookSamsys.infrastructure.Helpers;
using BookSamsys.Infrastructure.Interfaces.Services;
using BookSamsys.Infrastructure.Models.Author;
using Microsoft.AspNetCore.Mvc;


namespace BooksAPI2.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthorsController : ControllerBase
{
    private readonly IAuthorService _authorService;

    public AuthorsController(IAuthorService authorService)
    {
        _authorService = authorService;
    }

    // GET: api/Authors
    [HttpGet]
    public async Task<MessagingHelper<IEnumerable<AuthorDto>>> GetAuthors()
    {
        return await _authorService.GetAllAuthors();
    }

    // POST: api/Authors
    [HttpPost]
    public async Task<MessagingHelper> PostAuthor([FromBody] CreateAuthorDTO createAuthorDto)
    {
        MessagingHelper res = new();
        if (ModelState.IsValid) return await _authorService.CreateAuthor(createAuthorDto);
        res.Success = false;
        res.SetMessage("Invalid model object");
        return res;
    }
}