import React from "react";




const Home: React.FC = () => {
    return (
        <div className="home">
            <h1 className="homeTitle">Home</h1>
            <img className='homeBook' src='/Book/book.gif' alt="Book" />
            <h1>Welcome to BookSamsys</h1>
            <p>BookSamsys is a simple book management system that allows you to create, delete, update and search for books.</p>

        </div>
    );
}
export default Home;