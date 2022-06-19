import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="two">Page 1</Link>
      <Link to="three">Page 2</Link>
    </div>
  )
}

export default Header;