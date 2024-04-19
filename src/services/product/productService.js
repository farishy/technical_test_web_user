import axios from "axios";
import { BASE_URL_API } from "../../constant/constant";

const getAllProduct = async () => {
  const response = await axios.get(BASE_URL_API + "/product/all");
  return response.data.data;
};

const getAllProductByCategoryId = async (categoryId) => {
  const response = await axios.get(
    BASE_URL_API + "/product/category/" + categoryId
  );

  return response.data.data;
};

// Create new comment
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    BASE_URL_API + "/product/add",
    productData,
    config
  );
  return response.data;
};

const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    BASE_URL_API + "/product/delete/" + productId,
    config
  );
  return response.data;
};

const updateProduct = async (productId, productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    BASE_URL_API + "/product/update/" + productId,
    productData,
    config
  );
  return response.data;
};

const prodctService = {
  getAllProduct,
  getAllProductByCategoryId,
  createProduct,
  deleteProduct,
  updateProduct,
};

export default prodctService;
