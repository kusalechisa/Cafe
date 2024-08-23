import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { trackOrderById } from "../../services/orderService";
import NotFound from "../../components/NotFound/NotFound";
import classes from "./orderTrackPage.module.css";
import DateTime from "../../components/DateTime/DateTime";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import Title from "../../components/Title/Title";
import Map from "../../components/Map/Map";

export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (orderId) {
          const fetchedOrder = await trackOrderById(orderId);
          setOrder(fetchedOrder);
        }
      } catch (err) {
        setError("Failed to fetch order. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <NotFound message={error} linkText="Go To Home Page" />;
  if (!orderId || !order)
    return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title
          title={`Order #${order.id}`}
          fontSize="1rem"
          margin="0 0 1rem 0"
        />
        <div className={classes.header}>
          <div>
            <strong>Date:</strong>
            <DateTime date={order.createdAt} />
          </div>
          <div>
            <strong>Name:</strong>
            {order.name}
          </div>
          <div>
            <strong>Address:</strong>
            {order.address}
          </div>
          <div>
            <strong>Status:</strong>
            {order.status}
          </div>
          {order.paymentId && (
            <div>
              <strong>Payment ID:</strong>
              {order.paymentId}
            </div>
          )}
        </div>
      </div>
      <OrderItemsList order={order} />
      <div className={classes.mapContainer}>
        <Title title="Buyers Location" fontSize="1.6rem" />
        <Map
          location={order.addressLatLng}
          readonly={true}
          className={classes.map}
        />
      </div>

      {/* {order.status === "NEW" && (
        <div className={classes.payment}>
          <Link to="/payment">Go To Payment</Link>
        </div>
      )} */}
    </div>
  );
}
