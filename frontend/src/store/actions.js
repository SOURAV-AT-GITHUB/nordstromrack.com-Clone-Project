import axios from "axios";
import {
  CART_DATA_REQUEST,
  CART_DATA_SUCCESS,
  CART_DATA_FAILURE,
} from "./actionTypes";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const cartDataRequest = () => ({
  type: CART_DATA_REQUEST,
});
export const cartDataSuccess = (data) => ({
  type: CART_DATA_SUCCESS,
  payload: data,
});
export const cartDataFailure = (data) => ({
  type: CART_DATA_FAILURE,
  payload: data,
});
export const updateCartData = (token, type = "get", id = null,quantity = null) => {
  return async (dispatch) => {
    try {
      dispatch(cartDataRequest());
      let response;
      if (type === "get") {
        response = await axios.get(`${BACKEND_URL}/cart`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      } else if (type === "delete") {
        if (!id) return
        response = await axios.delete(`${BACKEND_URL}/cart/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      }else if (type === 'update'){
        if (!id || !quantity) return
        response= await axios.patch(`${BACKEND_URL}/cart/${id}`,{quantity},{
          headers:{
            authorization:`Bearer ${token}`
          }
        })
      }
      dispatch(cartDataSuccess(response.data.data));
    } catch (error) {
      dispatch(
        cartDataFailure(error.response?.data.message || error.message)
      );
    }
  };
};

// export const removeCartItemRequest = () => ({
//   type: REMOVE_CART_ITEM_REQUEST,
// });
// export const removeCartItemSuccess = (data) => ({
//   type: REMOVE_CART_ITEM_SUCCESS,
//   payload: data,
// });
// export const removeCartItemFailure = (data) => ({
//   type: REMOVE_CART_ITEM_FAILURE,
//   payload: data,
// });
// export const removeItemFromCart = (token, id) => {
//   return async (dispatch) => {
//     try {
//       dispatch(removeCartItemRequest());
//       const response = await axios.delete(`${BACKEND_URL}/cart/${id}`, {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });
//       dispatch(removeCartItemSuccess(response.data.data));
//     } catch (error) {
//       dispatch(
//         removeCartItemFailure(error.response.data.message || error.message)
//       );
//     }
//   };
// };
