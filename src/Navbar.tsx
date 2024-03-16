const Navbar = () => {
 return (
   <nav className="nav">
    <a href="/" className="site-title">Solace</a>
    <ul>
        <CustomLink href="/about">About Us</CustomLink>
        <CustomLink href="/upload"> Upload Document</CustomLink>
    </ul>
   </nav>
 );
};

function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname
    return (
        <li>
            <a href={href}>{children}</a>
        </li>
    )
}

export default Navbar;