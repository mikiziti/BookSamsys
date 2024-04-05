import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Author {
    id: number;
    name: string;

}

const SearchAuthor: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const fetchAuthors = async () => {
        setIsFetching(true);
        try {
            const response = await fetch("https://localhost:7132/api/Author");
            if (!response.ok) {
                throw new Error("Failed to fetch authors");
            }
            const data = await response.json();
            setAuthors(data);
        } catch (error) {
            console.error("Error fetching authors:", error);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <div>
            <h1 className="createBookTitle">Search Author</h1>
            <Link to="/authors" className="goBackToBooks">Back</Link>
            <button className="createBookButton" onClick={fetchAuthors} disabled={isFetching}>
                {isFetching ? "Searching..." : "Search"}
            </button>
            <div>
                {authors.map(author => (
                    <div key={author.id}>
                        <p>Nome: {author.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchAuthor;
