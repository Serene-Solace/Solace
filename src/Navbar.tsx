import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Navbar() {
 return (
   <nav className="nav">
    <Link to="/" className="site-title">Solace</Link>
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