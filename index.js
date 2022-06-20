const redux = require("redux");
const produce = require("immer").produce;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// single state
// const initialState = {
//   numOfCakes: 10,
//   numOfIcecreams: 20,
// };

// single reducer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - 1,
//       };
//     case CAKE_RESTOCKED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes + action.payload,
//       };
//     case ICECREAM_ORDERED:
//       return {
//         ...state,
//         numOfIcecreams: state.numOfIcecreams - 1,
//       };
//     case ICECREAM_RESTOCKED:
//       return {
//         ...state,
//         numOfIcecreams: state.numOfIcecreams + action.payload,
//       };
//     default:
//       return state;
//   }
// };

//multiple states
const initialCakeState = {
  numOfCakes: 10,
};

const initialIcecreamState = {
  numOfIcecreams: 20,
};

//cake reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return produce(state, (draft) => {
        draft.numOfCakes = state.numOfCakes - 1;
      });
    //   return {
    //     ...state,
    //     numOfCakes: state.numOfCakes - 1,
    //   };
    case CAKE_RESTOCKED:
      return produce(state, (draft) => {
        draft.numOfCakes = state.numOfCakes + action.payload;
      });
    //   return {
    //     ...state,
    //     numOfCakes: state.numOfCakes + action.payload,
    //   };
    default:
      return state;
  }
};

//icecream reducer
const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return produce(state, (draft) => {
        draft.numOfIcecreams = state.numOfIcecreams - 1;
      });
    //   return {
    //     ...state,
    //     numOfIcecreams: state.numOfIcecreams - 1,
    //   };
    case ICECREAM_RESTOCKED:
      return produce(state, (draft) => {
        draft.numOfIcecreams = state.numOfIcecreams + action.payload;
      });
    //   return {
    //     ...state,
    //     numOfIcecreams: state.numOfIcecreams + action.payload,
    //   };
    default:
      return state;
  }
};

//combining reducers
const rootReducers = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

//create a store
const store = createStore(rootReducers, applyMiddleware(logger));

// access to state
console.log("initial state", store.getState());

// updated state basically a listner // calls whenever the states changes
const unsbscribe = store.subscribe(
  () => {}
  //   console.log("updated state", store.getState())
);
//dispatch an action
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(2);

//unsunscribe
unsbscribe();
