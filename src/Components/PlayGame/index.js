import React, { Component } from 'react';
import { Table, Input, Button } from 'reactstrap';

class PlayGame extends Component {
    renderPlayers = () => {
        const { game } = this.props;
        
        if(game.players && game.players.length > 0) {
            return game.players.map((player, index) => {
                return <th key={index}>{player}</th>;
            });
        } else return null;
    }

    renderScores = () => {
        const { game } = this.props;

        if(game.scores && game.scores.length > 0) {
            return game.scores.map((score, index) => {
                return (<tr key={index}>
                    <td>{index + 1}</td>
                    {this.renderScoreRow(score, index)}
                </tr>)
            });
        } else return null;
    }

    renderScoreRow = (row, rowIndex) => {
        if(row && row.length > 0) {
            return row.map((item, index) => {
                return (<td key={index}>
                    <Input name={`${rowIndex}_${index}`} type="number" value={item} onChange={(event) => { this.handleChangeScore(event, index, rowIndex) }} />
                </td>)
            });
        } else return null;
    }

    handleChangeScore = (event, col, row) => {
        let { game, updateGameState } = this.props;

        game.scores[row][col] = Number(event.target.value);
        updateGameState(game);
    }

    addNewRow = () => {
        let { game, updateGameState } = this.props;

        game.scores.push([ 0, 0, 0, 0 ]);
        updateGameState(game);
    }

    renderSumScores = () => {
        let { game } = this.props;

        if(game.scores && game.scores.length > 0) {
            let totalScore = 0;
            let playerScores = [ 0, 0, 0, 0];

            game.scores.forEach(score => {
                score.forEach((item, index) => {
                    playerScores[index] += item;
                });
            });
            
            totalScore = playerScores.reduce((total, score) => {
                return total + score;
            }, 0);

            playerScores = playerScores.map((item, index) => {
                return <th key={index}>{item}</th>;
            });

            return (
                <tr>
                    <th>Sum of Score ({totalScore})</th>
                    {playerScores}
                </tr>
            )
        } else return (
            <tr>
                <th>Sum of Score (0)</th>
                <th>0</th>
                <th>0</th>
                <th>0</th>
                <th>0</th>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th></th>
                            {this.renderPlayers()}
                        </tr>
                        {this.renderSumScores()}
                    </thead>
                    <tbody>
                        {this.renderScores()}
                    </tbody>
                </Table>
                <div className="text-center mb-3">
                    <Button onClick={this.addNewRow} color="danger" type="submit">
                        Add row
                    </Button>
                </div>
            </div>
        );
    }
}

export default PlayGame;