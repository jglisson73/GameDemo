import React, { useState } from 'react';
import './App.css';
import $ from 'jquery'

function App() {

  interface IClue {
    id: string;
    type: string;
    name: string;
  }

  interface IHistory {
    id: number;
    who: IClue;
    what: IClue;
    why: IClue;
    matchCount: number;
  }

  class Clue implements IClue {
    id: string;
    type: string;
    name: string;

    constructor(type: string, name: string) {
      this.id = getId();
      this.type = type;
      this.name = name;
    }
  }

  class History implements IHistory {
    id: number;
    who: IClue;
    what: IClue;
    why: IClue;
    matchCount;

    constructor(who: IClue, what: IClue, why: IClue, matchCount: number) {
      this.id = _history.length + 1;
      this.who = who;
      this.what = what;
      this.why = why;
      this.matchCount = matchCount;
    }
  }

  const _whoList: Array<Clue> = [];
  _whoList.push(new Clue("Who", "Man1"));
  _whoList.push(new Clue("Who", "Man2"));
  _whoList.push(new Clue("Who", "Man3"));
  _whoList.push(new Clue("Who", "Man4"));
  _whoList.push(new Clue("Who", "Man5"));
  _whoList.push(new Clue("Who", "Man6"));

  const _whatList: Array<Clue> = [];
  _whatList.push(new Clue("What", "Weapon1"));
  _whatList.push(new Clue("What", "Weapon2"));
  _whatList.push(new Clue("What", "Weapon3"));
  _whatList.push(new Clue("What", "Weapon4"));
  _whatList.push(new Clue("What", "Weapon5"));
  _whatList.push(new Clue("What", "Weapon6"));

  const _whyList: Array<Clue> = [];
  _whyList.push(new Clue("Why", "Motive1"));
  _whyList.push(new Clue("Why", "Motive2"));
  _whyList.push(new Clue("Why", "Motive3"));
  _whyList.push(new Clue("Why", "Motive4"));
  _whyList.push(new Clue("Why", "Motive5"));
  _whyList.push(new Clue("Why", "Motive6"));


  const [_who] = useState<Clue>(getRandomValue(_whoList));
  const [_what] = useState<Clue>(getRandomValue(_whatList));
  const [_why] = useState<Clue>(getRandomValue(_whyList));

  //let _history: Array<History> = [];
  const [_history, setHistory] = useState<History[]>([]);

  function getId(): string {
    return Math.random().toString(36).substr(2, 9);;
  }

  function getRandomValue(array: Array<Clue>): Clue {
    let num = Math.floor(Math.random() * array.length);
    return array[num];
  }

  function handleGuess() {
    let who = new Clue("Who", String($("#whoSelect").val()));
    let what = new Clue("What", String($("#whatSelect").val()));
    let why = new Clue("Why", String($("#whySelect").val()));

    if (who.name && what.name && why.name) {
      if (_history.length > 8) {
        alert("You're out of guesses!");
      }
      else {
        pushHistory(who, what, why);
      }
    } else {
      alert("Must select all three!");
    }
  }

  function pushHistory(who: IClue, what: IClue, why: IClue): void {
    if (who.name === _who.name && what.name === _what.name && why.name === _why.name) {
      alert("We have a winner!");
    }
    else {
      let matchCount: number = 0;
      if (who.name === _who.name) { matchCount++ };
      if (what.name === _what.name) { matchCount++ };
      if (why.name === _why.name) { matchCount++ };

      let newHistory = _history;
      newHistory.push(new History(who, what, why, matchCount));
      setHistory([...newHistory]);
    }
  }


  function renderClueSelectOptions(clueList: Array<Clue>) {
    return clueList.map((clue) => <option key={clue.id} value={clue.name}>{clue.name}</option>);
  }

  return (
    <>
      <div className="App">
        <header className="App-header">

          <h1>Choose a Weapon, Suspect and Motive!</h1>

          {/* <div>{_who.name}, {_what.name}, {_why.name}</div> */}

          <div className="form-group">
            <select id="whoSelect" className="selectpicker col-md-4">
              <option key="0" value="">-Select Who-</option>
              {renderClueSelectOptions(_whoList)}
            </select>
            <select id="whatSelect" className="selectpicker col-md-4">
              <option key="0" value="">-Select What-</option>
              {renderClueSelectOptions(_whatList)}
            </select>
            <select id="whySelect" className="selectpicker col-md-4">
              <option key="0" value="">-Select Why-</option>
              {renderClueSelectOptions(_whyList)}
            </select>
            <button onClick={handleGuess}>Submit Guess!</button>
          </div>

          <h2>History</h2>
          <div>
            {_history.map((history) => { return <div key={history.id}>[Matches: {history.matchCount}] {history.who.name} | {history.what.name} | {history.why.name}</div> })}
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
