using System.ComponentModel.DataAnnotations;

namespace BookSamsys.infrastructure.Models.Book
{
    public class UpdateBookDTO
    {
        [Required(ErrorMessage = "ISBN is required")]
        public int Isbn { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "AuthorId is required")]
        public int AuthorId { get; set; }

        [Required(ErrorMessage = "Price is required")]
        public float Price { get; set; }
    }
}
