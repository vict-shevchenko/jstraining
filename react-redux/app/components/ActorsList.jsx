import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectActor, getActors } from '.././actions';

class ActorsListPresenter extends React.Component {

  componentDidMount() {
    this.props.getActors();
  }

  render() {

    const { actors = [], selectActor } = this.props;

    return (
      <div>
        <ul>
          {actors.map((actor, idx) => <li key={actor.id}>
            <a href="#" onClick={() => selectActor(actor.id)}>{actor.name}</a>
          </li>)}
        </ul>
      </div>
    )
  }

}

ActorsListPresenter.propTypes = {
  actors: PropTypes.array,
  selectActor: PropTypes.func
};

function mapStateToProps(state) {
  return {
    actors: state.actors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectActor: bindActionCreators(selectActor, dispatch),
    getActors: bindActionCreators(getActors, dispatch)
  }
}

const ActorsListContainer = connect(mapStateToProps, mapDispatchToProps)(ActorsListPresenter);

export default ActorsListContainer;


/*
componentDidMount () {
  fetch('/ui/i/Backup/Details ', {
    credentials: 'same-origin'
  })
  .then(response => response.text())
  .then(text => text.replace(/while\(1\);/, ''))
  .then(text => JSON.parse(text))
  .then(json =>  this.props.onInitialDataLoad(json));
}*/
