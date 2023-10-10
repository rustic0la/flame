import { Link } from "react-router-dom";

function App() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="peoples">peoples</Link>
        </li>
        <li>
          <Link to="favorites">favorites</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
