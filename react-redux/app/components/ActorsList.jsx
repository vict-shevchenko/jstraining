import React, { PropTypes } from 'react';

function ActorsListPresenter() {
  return (
    <span>actors list</span>
  )
}

ActorsListPresenter.propTypes = {
  
};

export default ActorsListPresenter;


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
