import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("/api/foods");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get(`/api/foods/search/${searchTerm}`);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get("/api/foods/tags");
  return data;
};

export const getAllByTag = async (tag) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get(`/api/foods/tag/${tag}`);
  return data;
};

export const getById = async (foodId) => {
  const { data } = await axios.get(`/api/foods/${foodId}`);
  return data;
};

export const deleteById = async (foodId) => {
  await axios.delete(`/api/foods/${foodId}`);
};

export const update = async (food) => {
  await axios.put("/api/foods", food);
};

export const add = async (food) => {
  const { data } = await axios.post("/api/foods", food);
  return data;
};
