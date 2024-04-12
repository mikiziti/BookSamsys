namespace BookSamsys.infrastructure.Helpers
{
    public class BookParameters: QueryStringParameters
    {
        public BookParameters()
        {
            OrderBy = "title";
        }
        public int Isbn { get; set; }
        public string Title { get; set; }
        public Guid AuthorId { get; set; }
    }
}
