import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import classes from "./header.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          KETI RESTAURANT
        </Link>
        <nav className={classes.nav}>
          <ul className={classes.menuList}>
            {user ? (
              <li className={classes.menuItem}>
                <Link to="/dashboard" className={classes.userLink}>
                  {user.name}
                </Link>
                <div className={classes.dropdownMenu}>
                  <Link to="/profile" className={classes.dropdownLink}>
                    Profile
                  </Link>
                  <Link to="/orders" className={classes.dropdownLink}>
                    Orders
                  </Link>
                  <button className={classes.logoutButton} onClick={logout}>
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login" className={classes.userLink}>
                  Login
                </Link>
              </li>
            )}
            <li className={classes.cartLink}>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cartCount}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
