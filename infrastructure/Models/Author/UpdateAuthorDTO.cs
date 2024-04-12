using System.ComponentModel.DataAnnotations;

namespace BookSamsys.Infrastructure.Models.Author;

public class UpdateAuthorDTO
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; } = null!;
}