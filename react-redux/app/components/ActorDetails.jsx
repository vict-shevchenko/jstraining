import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFilm } from '../actions';

class ActorDetailsPresenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actorFilmText: ''
    };
  }

  render() {
    const {actor, addFilm} = this.props;
    const fn = '';

    if (!actor) {
      return <span>loading actors</span>
    }
    
    return (
      <div>
        <h3>{actor.name}</h3>

        Films:
        <ul>
          {actor.films.map((film, idx) => <li key={idx}>{film}</li>)}
        </ul>

        Add Film
        <input type="text" ref="filmName" value={this.state.actorFilmText}
               onChange={() => this.setState({actorFilmText: this.refs.filmName.value})}/>
        <button type="button" onClick={() => addFilm(this.refs.filmName.value)}>Add Film</button>
      </div>
    )
  }
}

ActorDetailsPresenter.propTypes = {
  actor: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    films: PropTypes.array
  })
};

const ActionDetailsContainer = connect( (state) => {
  return {
    actor: state.actors.filter((actor) => actor.id === state.selectedActorId)[0]
  }
}, (dispatch) => {
  return {
    addFilm: bindActionCreators(addFilm, dispatch)
  }
}

)(ActorDetailsPresenter);

export default ActionDetailsContainer;