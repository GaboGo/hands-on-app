import { REQUEST_DATA, RECEIVE_DATA, UPDATE_DATA, SET_CURRENT_PAGE } from '../constants/constants'

export default function data(
    state = {
      isFetching: false,
      items: [],
      currentItems: [],
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
          items: action.data,
          currentItems: action.data.slice(0,10),
          currentPage: state.currentPage + 1
        })
      case UPDATE_DATA:
        let currentItems = state.currentItems;
        let userIndex = state.currentItems.findIndex(p => p.login.username === action.user.login.username);
        if (userIndex >= 0) {
          const picture = Object.assign({}, state.currentItems[userIndex].picture, {
            large: action.photo,
            medium: action.photo,
            thumbnail: action.photo
          })
          currentItems = [
            ...state.currentItems.slice(0, userIndex),
            {
              ...state.currentItems[userIndex],
              picture
            },
            ...state.currentItems.slice(userIndex + 1)
          ];
        }
        return {
          ...state,
          currentItems
        };
      case SET_CURRENT_PAGE:
        return Object.assign({}, state, {
            currentPage: action.page,
            currentItems: state.currentItems.concat(action.data)
        })
      default:
        return state
    }
}