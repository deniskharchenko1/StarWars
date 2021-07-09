import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import StarshipDetails from "../sw-components/starship-details";

import {PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage} from '../pages';


import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import './app.css';

export default class App extends Component {

  state = {
    // showRandomPlanet: true,
    swapiService: new SwapiService(),
    isLoggedIn: false

  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log('switched to', Service.name);

      return {
        swapiService: new Service()
      };
    });
  }

  // toggleRandomPlanet = () => {
  //   this.setState((state) => {
  //     return {
  //       showRandomPlanet: !state.showRandomPlanet
  //     }
  //   });
  // };

  render() {

    // const planet = this.state.showRandomPlanet ?
    //   <RandomPlanet/> :
    //   null;

    const {isLoggedIn} = this.state;


    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>

              {/* { planet } */}
              <RandomPlanet/>
              <Switch>
                <Route path='/' render={() => <h2>Welcome to StarWars</h2>}
                                exact/>
                <Route path='/people/:id?' component={PeoplePage}/>
                <Route path='/planets' component={PlanetsPage}/>
                <Route path='/starships' exact component={StarshipsPage}/>
                <Route path="/starships/:id"
                      render={({ match }) => {
                        const { id } = match.params;
                        return <StarshipDetails itemId={id} />
                      }}/>
                <Route 
                      path='/login'
                      render={() => (
                          <LoginPage 
                            isLoggedIn={isLoggedIn}
                            onLogin={this.onLogin}/>)}/>
                <Route path='/secret'
                      render={() => (<SecretPage isLoggedIn={isLoggedIn}/>)}/>

                <Redirect to="/"/>

              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
