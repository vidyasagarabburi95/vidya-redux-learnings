const redux = require("redux");

const createStore = redux.createStore;

const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTORED = "CAKE_RESTORED";

function order_cake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTORED,
    payload: qty,
  };
}

const initialState = {
  numOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTORED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("initial Store", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

/*store.dispatch(order_cake());
store.dispatch(order_cake());
store.dispatch(order_cake());
store.dispatch(restockCake(3))*/

const actions = bindActionCreators({ order_cake, restockCake }, store.dispatch);
actions.order_cake();
actions.order_cake();
actions.order_cake();
actions.order_cake();
actions.order_cake(3);

unsubscribe();
