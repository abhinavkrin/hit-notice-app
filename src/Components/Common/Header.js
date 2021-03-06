import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../config';

function Header(){
    return (
         <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light" role="navigation" itemScope="" itemType="http://schema.org/SiteNavigationElement">
                <div className="container-fluid d-flex justify-content-center">
                    <Link className="navbar-brand" to="/">
                        {APP_NAME}
                    </Link>
                </div>
            </nav>
        </header> 
    )
}

export default Header;
