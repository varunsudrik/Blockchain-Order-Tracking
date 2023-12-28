import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <header>
      <div className="logo">Supply Chain Management</div>
      <nav>
        <ul>
          <li>
            <Link className="nav_link" to="/">
              Wallet
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/view-all-orders">
              All Order
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/create-order">
              New Order
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/view-task">
              View Order
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/update-order">
              Update Order
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/delete-task">
              Delete Order
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
