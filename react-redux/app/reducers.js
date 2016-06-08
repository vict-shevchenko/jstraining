/**
 * Created by viktor.shevchenko on 4/29/2016.
 */

//import { combineReducers } from 'redux';
import { SELECT_ACTOR, ADD_FILM, SERVER_DATA_FETCHED } from './actions';

const defaultState = {
  actors: [{
    id: '9',
    name: 'Jim Carrey'
  },
    {
      id: '10',
      name: 'Tom Cruise',
      films: ["Mission Impossible", "Top Gun"]
    }],
  films: {
    '9': ["Mask", "Ace Ventura"],
  },
  selectedActorId: '9'
};

function addFilmToActor(state, filmName) {
  return state.actors.map((actor) => {
    if (actor.id === state.selectedActorId) {
      actor.films = [...actor.films, filmName]
    }
    return Object.assign({}, actor);
  })
}

function mainReducer(state = {actors: []}, action) {
  /*switch (action.type) {
    case SELECT_ACTOR:
     return Object.assign({}, state, {selectedActorId: action.id})
    case ADD_FILM:
      return Object.assign({}, state, {actors: addFilmToActor(state, action.filmName)});
    case SERVER_DATA_FETCHED:
      return Object.assign({}, state, {actors: action.actors, selectedActorId: action.actors[0].id})
    default:
      return state;
  }*/
}

function actors(actors, action) {

}

function films(films, action) {
case ADD_FILM:
    return Object.assign({}, state, {actors: addFilmToActor(state, action.filmName)});
}

case SELECT_ACTOR:
  return Object.assign({}, state, {selectedActorId: action.id})

mainReducer = combineReducers ({
  actors:
  films:
  selectActorId:
})

export default mainReducer;