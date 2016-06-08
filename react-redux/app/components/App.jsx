import React from 'react';
import './App.css';
import ActorsList from './ActorsList';
import ActorDetails from './ActorDetails';

export default function App() {
  return (
    <div className="page">
      <div className="page__container full-height">
        <header className="page__header">
          <nav className="page__nav">
            <div className="page__nav-item">Actors DB</div>
          </nav>
        </header>
        <div className="page__body container-fluid">
          <div className="page__content row">
            <div className="col-sm-3 full-height-sm">
              <ActorsList />
            </div>
            <div className="col-sm-9 full-height-sm">
              <ActorDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
