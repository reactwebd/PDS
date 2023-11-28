import { Link } from "react-router-dom";
import "./Mainheader.css";

export default function MainHeader() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
            <p className="logo">Persnol calculator</p>
          <ul className="nav-links">
            <li>
              <Link to="/">Exam entris</Link>
            </li>
            <li>
              <Link to="/bid">Bid entries</Link>
            </li>
            <li>
              <Link to="/loan">Loan entries</Link>
            </li>
            <li>
              <Link to="/capital">Capital</Link>
            </li>
      
          </ul>
        </div>
      </nav>
    </>
  );
}
