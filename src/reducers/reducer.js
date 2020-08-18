import { REQUEST_DATA, RECEIVE_DATA, UPDATE_DATA, SET_CURRENT_PAGE } from '../constants/constants'

export default function data(
    state = {
      isFetching: false,
      items: [],
      currentPage: 1
    },
    action
){
    switch (action.type) {
      case REQUEST_DATA:
        return Object.assign({}, state, {
          isFetching: action.flag,
        })
      case RECEIVE_DATA:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.data
        })
      case UPDATE_DATA:
        let items = state.items;
        let userIndex = state.items.findIndex(p => p.login.username === action.user.login.username);
        if (userIndex >= 0) {
          const picture = Object.assign({}, state.items[userIndex].picture, {
            large: action.photo,
            medium: action.photo,
            thumbnail: action.photo
          })
          items = [
            ...state.items.slice(0, userIndex),
            {
              ...state.items[userIndex],
              picture
            },
            ...state.items.slice(userIndex + 1)
          ];
        }
        return {
          ...state,
          items
        };
      case SET_CURRENT_PAGE:
        return Object.assign({}, state, {
            currentPage: action.page,
        })
      default:
        return state
    }
}