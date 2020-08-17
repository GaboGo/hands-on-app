import { REQUEST_DATA, RECEIVE_DATA, SET_CURRENT_PAGE } from '../constants/constants'

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
      case SET_CURRENT_PAGE:
        return Object.assign({}, state, {
            currentPage: action.page,
        })
      default:
        return state
    }
}