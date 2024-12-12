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

    case "logout": {
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
  id: null,
  email: null,
  items: [],
};
export const cartReducer = (
  state = { ...defaultCartState },
  { type, payload }
) => {
  switch (type) {
    case "add": {
      state = { ...state, items: [...state.items, { ...payload }] };
      return state;
    }
    case "remove": {
      state = {
        ...state,
        items: [state.items.filter((item) => item.id !== payload.id)],
      };
      return state;
    }
    default:
      return state;
  }
};
