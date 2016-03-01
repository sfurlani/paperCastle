/* eslint-disable */

// Imports go here
import PIXI from 'pixi.js';
import { quests as JSON } from './quests.json';

/* eslint-enable */

export class Result extends Object {
  constructor(json, ...args) {
    super(...args);
    let self = this;

    self.text = json.text || '';
    self.vitality = json.vitality || '';
    self.gold = json.gold || '';
    self.link = json.link || '';
    self.chance = json.chance || '';

  }
  text;
  vitality;
  gold;
  link;
  chance;
}

export class Choice extends Object {
  constructor(json, ...args) {
    super(...args);
    let self = this;

    self.text = json.text;
    let results = [];
    if (json.results) {
      for (let r of json.results) {
        let result = new Result(r);
        result && results.push(result);
      }
    }
    else {
      let data = {
        result: json.result || '',
        vitality: json.vitality || '',
        gold: json.gold || '',
        link: json.link || '',
        chance: 1
      }
      let result = new Result(data);
      result && results.push(result);
    }

    self.results = results;

  }

  text;
  results;
}

export class Quest extends Object {

  constructor(json, ...args) {
    super(...args);
    let self = this;

    self.key = json.key || '';
    self.title = json.title || '';
    self.text = json.text || '';

    let choices = [];
    for (let c of json.choices) {
      let choice = new Choice(c);
      choice && choices.push(choice);
    }
    self.choices = choices;
  }

  key;
  title;
  text;
  choices;

}

export const QUESTS = (function(json) {
  let quests = [];
  for (let j of json) {
    let quest = new Quest(j);
    quest && quests.push(quest);
  }
  return quests;
})(JSON);
