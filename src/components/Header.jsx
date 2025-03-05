import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">DS/DE Blog</Link>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="https://github.com/renocrypt/ds-de-blog/issues" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;