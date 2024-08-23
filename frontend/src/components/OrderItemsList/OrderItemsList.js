import React from "react";
import { Link } from "react-router-dom";
import Price from "../Price/Price";
import classes from "./orderItemsList.module.css";

export default function OrderItemsList({ order }) {
  // Default order if none is provided
  const defaultOrder = {
    items: [],
    totalPrice: 0,
  };
  const { items, totalPrice } = order || defaultOrder;

  return (
    <div className={classes.container}>
      {/* Table for larger screens */}
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5">
              <h3>Order Items:</h3>
            </td>
          </tr>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.food.id}>
                <td>
                  <Link to={`/food/${item.food.id}`}>
                    <img
                      src={item.food.imageUrl}
                      alt={item.food.name}
                      className={classes.image}
                    />
                  </Link>
                </td>
                <td>{item.food.name}</td>
                <td>
                  <Price price={item.food.price} />
                </td>
                <td>{item.quantity}</td>
                <td>
                  <Price price={item.price} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No items in this order.</td>
            </tr>
          )}
          <tr>
            <td colSpan="3"></td>
            <td>
              <strong>Total:</strong>
            </td>
            <td>
              <Price price={totalPrice} />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Card layout for smaller screens */}
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.food.id} className={classes.card}>
            <Link to={`/food/${item.food.id}`}>
              <img
                src={item.food.imageUrl}
                alt={item.food.name}
                className={classes.image}
              />
            </Link>
            <h3>{item.food.name}</h3>
            <p>
              <strong>Price:</strong> <Price price={item.food.price} />
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Total:</strong> <Price price={item.price} />
            </p>
          </div>
        ))
      ) : (
        <div className={classes.card}>
          <p>No items in this order.</p>
        </div>
      )}

      {/* Display total price in card layout */}
      <div className={classes.card}>
        <p>
          <strong>Total:</strong> <Price price={totalPrice} />
        </p>
      </div>
    </div>
  );
}
