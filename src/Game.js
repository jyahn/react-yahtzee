import React, {
  Component
} from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      dice: Array.from({
        length: NUM_DICE
      }).map((d, i) => Math.ceil(Math.random() * 6)),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS - 1,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.restartGame = this.restartGame.bind(this);

  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map(
        (d, i) => st.locked[i] ? d : Math.ceil(Math.random() * 6)),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ],
      }))
    }
  }

  async doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    if (this.state.scores[rulename] === undefined) {
      await this.setState(st => ({
        scores: {
          ...st.scores,
          [rulename]: ruleFn(this.state.dice)
        },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false),
      }));
      if (!Object.values(this.state.scores).includes(undefined)) {
        this.setState({gameOver: true, rollsLeft: 0, locked: [true, true, true, true, true]})
      } else {
        this.roll();
      }
    }
  }

  restartGame() {
    this.setState({
      gameOver: false,
      dice: Array.from({
        length: NUM_DICE
      }).map((d, i) => Math.ceil(Math.random() * 6)),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS - 1,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    })
  }

  render() {
    return (
      <section >
        <Dice dice={this.state.dice} locked={this.state.locked} toggleLocked={this.toggleLocked} />
        <button className="Game-reroll" disabled={this.state.locked.every(x => x)} onClick={this.roll} >
          {this.state.rollsLeft} Rerolls Left
          </button> <ScoreTable doScore={this.doScore} scores={this.state.scores} />
          <h1>Total Score: {Object.values(this.state.scores).reduce((red, score) => {
            if (score) {
              return red + score;
            } else {
              return red;
            }
          }, 0)}</h1>
          {this.state.gameOver ? <button className="Game-reroll" onClick={this.restartGame}>Start Over</button> : null}
      </section >
    );
  }
}

export default Game;