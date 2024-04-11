import axios from "axios";

class BookService {
    baseUrl = "https://localhost:7132";

    // Get all books
    async getBooks() {
        const response = await axios.get(`${this.baseUrl}/api/Book`);
        return response.data;
    }
    //Create a new book
    async createBook(book: any) {
        const response = await axios.post(`${this.baseUrl}/addBook`, book);
        return response.data;
    }
    //Get book by ISBN
    async getBookByISBN(isbn: number) {
        const response = await axios.get(`${this.baseUrl}/booksByIsbn/${isbn}`);
        return response.data;
    }
    //Get book by title
    async getBooksByTitle(title: string) {
        const response = await axios.get(`${this.baseUrl}/booksByTitle/${title}`);
        return response.data;
    }
    //Get book by author
    async getBooksByAuthor(authorId: number) {
        const response = await axios.get(`${this.baseUrl}/booksByAuthor/${authorId}`);
        return response.data;
    }
    //Get book by price
    async getBooksByPrice(price: number) {
        const response = await axios.get(`${this.baseUrl}/booksByPrice/${price}`);
        return response.data;
    }
    //Update book
    async updateBook(book: any) {
        const response = await axios.put(`${this.baseUrl}/updateBook/${book.isbn}`, book);
        return response.data;
    }
    //Delete book
    async deleteBook(isbn: string) {
        const response = await axios.delete(`${this.baseUrl}/deleteBook/${isbn}`);
        return response.data;
    }
    //Get books in alphabetical order
    async getBooksInAlphabeticalOrder() {
        const response = await axios.get(`${this.baseUrl}/alphabeticOrder`);
        return response.data;
    }
    //Get books by pagination
    async getBooksByPagination() {
        const response = await axios.get(`${this.baseUrl}/pagination/`);
        return response.data;
    }
}
export default new BookService();