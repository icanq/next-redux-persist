const initialState = {
  server: "",
  client: "",
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case `counter/increment`:
      return { ...state, counter: action.payload + 1 };
    case `counter/decrement`:
      return { ...state, counter: action.payload - 1 };
    default:
      return state;
  }
};

export default counterReducer;
