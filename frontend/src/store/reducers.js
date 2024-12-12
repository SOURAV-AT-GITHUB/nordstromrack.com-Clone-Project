const defaultAuthState = {
  user: {firstname:"Test"},
  token: true,
  isLoading: false,
  isError: false,
};

export const authReducer = (
  state = { ...defaultAuthState },
  { type, payload }
) => {
  switch (type) {
    case "Login": {
      const { email, password } = payload;
      if (!email || !password) {
        return (state = { ...defaultAuthState, isError: true });
      } else {
        //
      }
    }
    break 
    case "Logout" : {
      return state = {
            user: null,
            token: null,
            isLoading: false,
            isError: false,
          }
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
    case "ADD": {
      state = { ...state, items: [...state.items, { ...payload }] };
      return state;
    }
    case "Remove": {
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
