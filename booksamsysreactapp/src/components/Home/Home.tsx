import React from "react";
import { Routes, Route } from "react-router-dom";
import bookImg from "../../data/book.gif";
import NavegationBar from "../NavegationBar";
import Books from "../Books/Books";

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1 className="homeTitle">Home</h1>
            <img className='homeBook' src={bookImg} alt="Book" />
            <h1>Welcome to BookSamsys</h1>
            <p>BookSamsys is a simple book management system that allows you to create, delete, update and search for books.</p>

        </div>
    );
}
export default Home;