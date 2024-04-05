import React from "react";
import { useNavigate } from "react-router-dom";

const UpdateBook: React.FC = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate('/books');
    }
    return (

        <div>
            <h1 className="createBookTitle">Update Book</h1>
            <form className="createBookForm">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />

                <label htmlFor="author">Author</label>
                <input type="string" id="author" name="author" />

                <label htmlFor="isbn">ISBN</label>
                <input type="number" id="isbn" name="isbn" />

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" />

                <label htmlFor="numPages">Number of Pages</label>
                <input type="number" id="numPages" name="numPages" />
            </form>
            <button className="createBookButton" type="submit" onClick={back}>Update</button>

            <button className="goBackToBooks" onClick={back}>Back</button>
        </div>
    );
}
export default UpdateBook;