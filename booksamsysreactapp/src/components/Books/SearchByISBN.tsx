import React from "react";
import { useNavigate } from "react-router-dom";

const SearchByISBN: React.FC = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate('/books');
    }
    return (

        <div>
            <h1 className="createBookTitle">Search Book by IBSN</h1>
            <form className="createBookForm">
                <label htmlFor="title">ISBN</label>
                <input type="number" id="isbn" name="ISBN" />

            </form>
            <button className="goBackToBooks" onClick={back}>Back</button>
            <button className="createBookButton" type="submit" onClick={back}>Search</button>
        </div>
    );

}
export default SearchByISBN;