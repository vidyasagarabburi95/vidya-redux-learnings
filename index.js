const redux = require("redux");

const createStore = redux.createStore;

const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTORED = "CAKE_RESTORED";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";
const ICE_CREAM_RESTOCKED = "ICE_CREAM_RESTOCKED";

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

function order_ice_cream(qty = 1) {
  return {
    type: ICE_CREAM_ORDERED,
    payload: qty,
  };
}

function ice_cream_restocked(qty = 1) {
  return {
    type: ICE_CREAM_RESTOCKED,
    payload: qty,
  };
}

/*const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};*/

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
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
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };

    case ICE_CREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer);
console.log("initial Store", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

/*store.dispatch(order_cake());
store.dispatch(order_cake());
store.dispatch(order_cake());
store.dispatch(restockCake(3))*/

const actions = bindActionCreators(
  { order_cake, restockCake, order_ice_cream, ice_cream_restocked },
  store.dispatch
);
actions.order_cake();
actions.order_cake();
actions.order_cake();
actions.order_cake();
actions.order_cake(3);
actions.order_ice_cream();
actions.order_ice_cream();
actions.ice_cream_restocked();
actions.ice_cream_restocked(3);

unsubscribe();
