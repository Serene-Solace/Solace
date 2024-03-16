import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "./logo.svg";

function Navbar() {
 return (
   <nav className="nav">
    <a href="/">
      <img src={logo} alt="Logo" className="site-title" />
    </a>
    <ul>
        <CustomLink to="/about">About Us</CustomLink>
        <CustomLink to="/upload"> Upload Document</CustomLink>
    </ul>
   </nav>
 );
}

function CustomLink({ to, children, ...props }) {
  
    return (
      <li>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}

export default Navbar;