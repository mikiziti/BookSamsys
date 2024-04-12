
using BookSamsys.infrastructure.Helpers;
using BookSamsys.Infrastructure.Models.Author;

namespace BookSamsys.Infrastructure.Interfaces.Services;

public interface IAuthorService
{
    Task<MessagingHelper<IEnumerable<AuthorDto>>> GetAllAuthors();
    Task<MessagingHelper> CreateAuthor(CreateAuthorDTO createAuthorDto);
}