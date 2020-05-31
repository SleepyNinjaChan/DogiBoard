import { combineReducers } from 'redux'

// import cardReducer from './cards'
import selectedCard from './selectedCard'
// import listReducer from './lists'
import user from './user'
import board from './board'
// import route from './route'

export default combineReducers({
	// cardReducer,
	selectedCard,
	// listReducer,
	user,
	board,
	// route
})
