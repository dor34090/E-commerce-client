import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  GET_FILTERED_PRODUCTS,
} from "../actions/types";
const initialState = {
  products: [],
  filtered: [],
  product: {},
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FILTERED_PRODUCTS:
      return {
        ...state,
        filtered: payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        errors: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
