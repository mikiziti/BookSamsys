using AutoMapper;
using BookSamsys.infrastructure.Entities;
using BookSamsys.Infrastructure.Models.Author;
using BookSamsys.infrastructure.Models.Book;

namespace BookSamsys.API.Mapping
{
    public class Mapping: Profile
    {
        public Mapping()
        {

            CreateMap<Author, AuthorDto>();
            CreateMap<CreateAuthorDTO, Author>();
            CreateMap<UpdateAuthorDTO, Author>();
            CreateMap<Book, BookDTO>().ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.Name));
            CreateMap<CreateBookDTO, Book>();
            CreateMap<UpdateBookDTO, Book>();
        }
    }
}
