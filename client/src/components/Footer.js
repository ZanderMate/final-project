import React from 'react';

const Footer = () => {

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("store");
        window.location.href="/login"
    }

    return (
        <div className="footer">
            <input
                onClick={logOut}
                type="submit"
                className="btn btn-logout"
                value="Log Out"
            />
        </div>
    )

}

export default Footer;