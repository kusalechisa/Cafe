import React, { useState, useEffect } from "react";
import classes from "./paymentPage.module.css";
import { getNewOrderForCurrentUser } from "../../services/orderService";
import Title from "../../components/Title/Title";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import Map from "../../components/Map/Map";
import PaypalButtons from "../../components/PaypalButtons/PaypalButtons";

export default function PaymentPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return null; // Prevent rendering if order data is not available

  return (
    <div className={classes.container}>
      <div className={classes.orderSection}>
        <Title title="Order Summary" fontSize="1.8rem" />
        <div className={classes.summary}>
          <div className={classes.summaryItem}>
            <h3>Name:</h3>
            <span>{order.name}</span>
          </div>
          <div className={classes.summaryItem}>
            <h3>Address:</h3>
            <span>{order.address}</span>
          </div>
        </div>
        <OrderItemsList order={order} />
      </div>
      <Title title="Your Location" fontSize="1.8rem" />
      <div className={classes.mapSection}>
        <Map readonly={true} location={order.addressLatLng} />
      </div>

      <div className={classes.buttonsContainer}>
        <PaypalButtons order={order} />
      </div>
    </div>
  );
}
