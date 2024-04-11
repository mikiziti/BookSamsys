import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateAuthor: React.FC = () => {
    const [authorName, setAuthorName] = useState("");
    const navigate = useNavigate();

    const handleAuthorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch("https://localhost:7132/api/Author", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ name: authorName }),
            });
            if (response.ok) {
                // Handle success, maybe redirect to the authors list page
                alert("Author created successfully");
                navigate("/authors")
            } else {
                alert("Failed to create author");
            }
        } catch (error) {
            console.error("Error creating author:", error);
            alert("Failed to create author");
        }
    };

    return (
        <div>
            <h1 className="createBookTitle">Create Author</h1>
            <form onSubmit={handleSubmit}>
                <label>Author Name:</label>
                <input
                    type="text"
                    name="authorName"
                    value={authorName}
                    onChange={handleAuthorNameChange}
                    required
                />
                <button type="submit" className="createBookButton">
                    Create
                </button>
            </form>
            <Link to="/authors" className="goBackToBooks">Back</Link>
        </div>
    );
};

export default CreateAuthor;
