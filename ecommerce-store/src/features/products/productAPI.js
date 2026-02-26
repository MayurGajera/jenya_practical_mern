import axios from "axios";

// Fetch products with pagination
export const fetchProductsApi = async ({ limit = 12, skip = 0 }) => {
  const response = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
  );
  return response.data;
};

// Fetch products by category
export const fetchProductsByCategoryApi = async (category) => {
  const url =
    category === "all"
      ? "https://dummyjson.com/products"
      : `https://dummyjson.com/products/category/${category}`;
  const response = await axios.get(url);
  return response.data;
};

// Fetch categories
export const fetchCategoriesApi = async () => {
  const response = await axios.get("https://dummyjson.com/products/categories");
  return response.data;
};
