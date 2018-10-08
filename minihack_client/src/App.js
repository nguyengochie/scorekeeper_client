import React, { Component } from 'react';
import  Navbar from './Components/Navbar';
import './App.css';
import { Container } from 'reactstrap';
import NewGame from './Components/NewGame';
import PlayGame from './Components/PlayGame/index';
import axios from 'axios';
import { API_ROOT } from './statics';   
class App extends Component {
  state = {
    game: null,
    gameId: "5bb75cab8e80f940d482432e"
  }

  componentDidMount() {
    const { gameId } = this.state;
    axios.get(`${API_ROOT}/game/${gameId}`)
      .then(response => {
        if(response.data && response.data.success) {
          this.setState({ game: response.data.game });
        }
      })
      .catch(err => console.error(err));
  }

  updateGameState = (gameData) => {
    axios.put(`${API_ROOT}/api/game`, { gameId: gameData._id, scores: gameData.scores } )
      .then(response => {
        if(response.data && response.data.success) {
          console.log("success");
        }
      })
    this.setState({ game: gameData });
  }

  render() {
    const title = "Score keeper";
    return (
      <div className="App">
      <Container>
        <header className="App-header">
        <Navbar title={title} time={this.state.now} />
        </header>
        <div className="content">
        {
          !this.state.game ? <NewGame updateGameState={this.updateGameState} /> : <PlayGame updateGameState={this.updateGameState} game={this.state.game} />
        }
      </div>
      </Container>     
      </div>
    );
  }
}

export default App;
