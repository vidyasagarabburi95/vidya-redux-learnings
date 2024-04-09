const initialState = {
  name: "vidya",
  address: {
    street: "abcd",
    city: "kmm",
    state: "TG",
  },
};
const redux = require("redux");

const produce = require("immer").produce; ///for updating state to mutable objector data structures with the pacakge name immer

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  // Providing initialState as default value
  switch (action.type) {
    case STREET_UPDATED:
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer);

console.log("updatedstate ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated street", store.getState())
);
store.dispatch(updateStreet("456vcv"));
unsubscribe();
