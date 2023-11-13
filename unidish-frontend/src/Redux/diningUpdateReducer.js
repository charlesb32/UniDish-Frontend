const INCREMENT_UPDATE_COUNTER = "INCREMENT_UPDATE_COUNTER";

// The initial state is just a counter set to 0
const initialState = {
  updateCounter: 0,
};

// The reducer listens for actions concerning restaurant updates
const diningUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGOUT":
      return initialState; // Reset user state when logging out
    case INCREMENT_UPDATE_COUNTER:
      // Increment the counter when the relevant action is dispatched
      return {
        ...state,
        updateCounter: state.updateCounter + 1,
      };
    default:
      // Return the existing state unchanged if no relevant actions are dispatched
      return state;
  }
};

export default diningUpdateReducer;
