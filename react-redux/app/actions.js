/**
 * Created by viktor.shevchenko on 5/16/2016.
 */


export const SELECT_ACTOR = 'SELECT_ACTOR';
export const ADD_FILM = 'ADD_FILM';
export const SERVER_DATA_FETCHED = 'SERVER_DATA_FETCHED';



export function selectActor(id) {
  return { type: 'SELECT_ACTOR', id: id };
}

export function addFilm(filmName) {
  return {
    type: ADD_FILM,
    filmName
  }
}

export function getActors() {
  return (dispatch, getState) => {
    fetch('mocks/actors.json')
    .then(response => response.json())
    .then(json =>  dispatch({type: SERVER_DATA_FETCHED, actors: json.actors}));
  }
}