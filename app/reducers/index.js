import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import gameRooms from './gameRooms';
import gamePositions from './gamePositions';
import logPosition from './logPosition';

export default combineReducers({
  messages,
  auth,
  gameRooms,
  gamePositions,
  logPosition
});
