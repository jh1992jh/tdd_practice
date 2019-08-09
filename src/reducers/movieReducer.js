import { actionTypes } from "../actions";

const initialState = {
  movie: null
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    default:
      return state;
  }
}
