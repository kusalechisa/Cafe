import axios from "axios";

// Create a new order
export const createOrder = async (order) => {
  try {
    const { data } = await axios.post("/api/orders/create", order);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Re-throw error for further handling if needed
  }
};

// Get the new order for the current user
export const getNewOrderForCurrentUser = async () => {
  try {
    const { data } = await axios.get("/api/orders/newOrderForCurrentUser");
    return data;
  } catch (error) {
    console.error("Error fetching new order for current user:", error);
    throw error; // Re-throw error for further handling if needed
  }
};

// Pay for an order
export const pay = async (paymentId) => {
  try {
    const { data } = await axios.put("/api/orders/pay", { paymentId });
    return data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error; // Re-throw error for further handling if needed
  }
};

// Track an order by ID
export const trackOrderById = async (orderId) => {
  try {
    const { data } = await axios.get(`/api/orders/track/${orderId}`);
    return data;
  } catch (error) {
    console.error("Error tracking order by ID:", error);
    throw error; // Re-throw error for further handling if needed
  }
};

// Get all orders by state
export const getAll = async (state) => {
  try {
    const { data } = await axios.get(`/api/orders/${state ?? ""}`);
    return data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error; // Re-throw error for further handling if needed
  }
};

// Get all order statuses
export const getAllStatus = async () => {
  try {
    const { data } = await axios.get("/api/orders/allstatus");
    return data;
  } catch (error) {
    console.error("Error fetching all statuses:", error);
    throw error; // Re-throw error for further handling if needed
  }
};
