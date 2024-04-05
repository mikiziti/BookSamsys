import React from "react";
import './styles.css';

const NavegationBar = () => {
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/books">Books </a>
                    </li>
                    <li>
                        <a href="/authors">Authors</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
export default NavegationBar;