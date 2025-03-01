import { useState } from "react";

const loggedInUser = () => {
    //API call to check authentication
    return false ;
}

const Title = () => (
    <a href="/">
        <img
            className="logo"
            alt="logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFA9qiqeZ5pfX0J68IQJfKXRVAsCFDUVl9sQ&s">
        </img>
    </a>
);

const Header = function () {
    const [isLoggedIn, setisLoggedIn] = useState(false);

    return (
        <div className="header">
            <Title />
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                    <li>Cart</li>
                </ul>
            </div>
            {
                isLoggedIn ? 
                <button onClick={()=>setisLoggedIn(false)}>Logout</button> : <button onClick={()=>setisLoggedIn(true)}>Login</button>
            }
            
             
            
        </div>
    );
};

export default Header;