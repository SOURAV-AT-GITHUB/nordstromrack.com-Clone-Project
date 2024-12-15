import {
  CART_DATA_REQUEST,
  CART_DATA_SUCCESS ,
  CART_DATA_FAILURE,
} from "./actionTypes";

const defaultAuthState = {
  firstname: null,
  lastname: null,
  email: null,
  token: false,
};

export const authReducer = (
  state = JSON.parse(localStorage.getItem("user")) || { ...defaultAuthState },
  { type, payload }
) => {
  switch (type) {
    case "signin": {
      const { firstname, lastname, email, token } = payload;
      state = { firstname, lastname, email, token };
      localStorage.setItem("user", JSON.stringify(state));

      return state;
    }

    case "signout": {
      state = {
        ...defaultAuthState,
      };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    }
    default:
      return state;
  }
};

const defaultCartState = {
  email: null,
  subtotal:0.00,
  estimatedTax:0.00,
  savings:0.00,
  items: [],
  isLoading: false,
  isError: null,
};
export const cartReducer = (state = defaultCartState, { type, payload }) => {
  switch (type) {
    case CART_DATA_REQUEST:
      return { ...state, isLoading: true, isError: null };
    case CART_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        ...payload
        // email: payload.email,
        // subtotal:payload.subtotal,
        // estimatedTax:payload.estimatedTax,
        // savings:payload.savings,
        // items: payload.items || [],
      };
    case CART_DATA_FAILURE:
      return { ...state, isLoading: false, isError: payload };

    default:
      return state;
  }
};
