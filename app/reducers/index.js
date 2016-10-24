import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import gameRooms from './gameRooms';
import currentGameRoom from './currentGameRoom';

export default combineReducers({
  messages,
  auth,
  gameRooms,
  currentGameRoom
});
