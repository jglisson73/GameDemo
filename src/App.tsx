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
  _whoList.push(new Clue("Who", "Sir Squeak"));
  _whoList.push(new Clue("Who", "Sammy Stickman"));
  _whoList.push(new Clue("Who", "Wallace Waffle"));
  _whoList.push(new Clue("Who", "Mollie Model-3"));
  _whoList.push(new Clue("Who", "Big Bertha"));
  _whoList.push(new Clue("Who", "Holly the Hideous"));

  const _whatList: Array<Clue> = [];
  _whatList.push(new Clue("What", "The Bonker"));
  _whatList.push(new Clue("What", "Gun of Squirting"));
  _whatList.push(new Clue("What", "Spoon of Clunking"));
  _whatList.push(new Clue("What", "FRAAAP!"));
  _whatList.push(new Clue("What", "Pan of Clanging"));
  _whatList.push(new Clue("What", "The Foot Destroyer"));

  const _whyList: Array<Clue> = [];
  _whyList.push(new Clue("Why", "Free Candy"));
  _whyList.push(new Clue("Why", "Access to Protected NFT's"));
  _whyList.push(new Clue("Why", "Needed Hunting Practice"));
  _whyList.push(new Clue("Why", "Organ 'Donation'"));
  _whyList.push(new Clue("Why", "Wants a Zombie Friend"));
  _whyList.push(new Clue("Why", "Add to Skull Collection"));

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
      if (_history.length > 9) {
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

          <h1>Choose a Suspect, Weapon, and Motive!</h1>

          {/* <div>{_who.name}, {_what.name}, {_why.name}</div> */}

          <div className="form-group">
            <select id="whoSelect" className="selectpicker col-md-4">
              <option key="0" value="">-Select Suspect-</option>
              {renderClueSelectOptions(_whoList)}
            </select>
            <select id="whatSelect" className="selectpicker col-md-4">
              <option key="0" value="">-Select Weapon-</option>
              {renderClueSelectOptions(_whatList)}
            </select>
            <select id="whySelect" className="selectpicker col-md-4">
              <option key="0" value="">-Select Motive-</option>
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
