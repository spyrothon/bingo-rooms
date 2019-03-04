import './elements/atoms/bl-bingo-board.js';
import './elements/atoms/bl-live-bingo-board.js';
import './elements/atoms/bl-logo.js';
import './elements/atoms/bl-nameplate.js';
import './elements/atoms/bl-sized-box.js';

import {
  requestRoom
} from './app/actions';
import { store } from './app/store';


store.dispatch(requestRoom(140367653));
