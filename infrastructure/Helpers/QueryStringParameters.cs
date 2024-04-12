namespace BookSamsys.infrastructure.Helpers
{
    public abstract class QueryStringParameters
    {
        private const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > maxPageSize ? maxPageSize : value;
        }
        public string? OrderBy { get; set; }
        public string? SearchBY { get; set; }
    }
}
