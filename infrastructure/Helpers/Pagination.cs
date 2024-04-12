using Microsoft.EntityFrameworkCore;
namespace BookSamsys.infrastructure.Helpers
{
    public class Pagination<T> : List<T>
    {
        public int CurrentPage { get; set; } //pagina atual
        public int TotalPages { get; set; } //total de paginas
        public int PageSize { get; set; } //quantidade de itens por pagina
        public int TotalCount { get; set; } //total de itens

        public IEnumerable<T> Items { get; set; } //retorna os itens

        public bool HasPrevious => CurrentPage > 1; //verifica se tem pagina anterior
        public bool HasNext => CurrentPage < TotalPages;  //verifica se tem proxima pagina


        public Pagination() //construtor
        {
        }

        private Pagination(IEnumerable<T> items, int count, int pageNumber, int pageSize) //construtor
        {
            TotalCount = count;  //total de itens
            PageSize = pageSize; //quantidade de itens por pagina
            CurrentPage = pageNumber; //pagina atual
            TotalPages = (int)Math.Ceiling(count / (double)pageSize); //total de paginas
            Items = items; //itens
        }
        public static async Task<Pagination<T>> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize) //cria a paginacao
        {
            var count = await source.CountAsync(); //conta a quantidade de itens
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(); //pega os itens da pagina
            return new Pagination<T>(items, count, pageNumber, pageSize); //retorna a paginacao criada com os por pagina
        }
    }
}
