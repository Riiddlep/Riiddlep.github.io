import { exit } from 'process';
import { SelectPerso, Character } from './character_creation';
import load from './saves.json';
import Editor from './json_editor';

const readlineSync = require('readline-sync');

let sum: Character = {
  name: '',
  race: '',
  classes: '',
  baselife: 0,
  hp: 0,
  heal: 0,
  str: 0,
  alignment: '',
  basemp: 0,
  mp: 0,
  int: 0,
  def: 0,
  res: 0,
  spd: 0,
  luck: 0,
  rarity: 0,
};
let intro = false;
let diff = 0;
let level = 1;
let levels = 0;

// display the game menu screen
export function GameTitleScreen() {
  console.log(
    '\n\n----------------------------------------------------------- THE HYRULE CASTLE -----------------------------------------------------------\n\n',
  );
  while (intro === false) {
    const titleScreenChoice = readlineSync.question(
      '        1 - New game  2- Continue   3 - Mod Manager  4 - Modify Data  5 - Quit   ',
    );
    switch (titleScreenChoice) {
      case '1':
        sum = SelectPerso();
        intro = true;
        return sum;
      case '2':
        if (load.Sauvegarde[load.Sauvegarde.length - 1].hp !== 0) {
          sum = load.Sauvegarde[load.Sauvegarde.length - 1].perso;
          level = load.Sauvegarde[load.Sauvegarde.length - 1].level;
          levels = load.Sauvegarde[load.Sauvegarde.length - 1].levels;
          diff = load.Sauvegarde[load.Sauvegarde.length - 1].difficulty;
          return sum;
        }
        console.log("\nYou don't have any save \n");
        break;
      case '3':
        break;
      case '4':
        Editor();
        break;
      case '5':
        exit();
        break;
      default:
        console.log('\nPut a select action\n');
        break;
    }
  }
}
// Select Difficulty
export function DifficultySelectorScreen() {
  console.log('\nChoose a difficulty:\n');
  if (diff === 0) {
    const difficulty = readlineSync.question(
      '1 - Normal   2 - Hard   3 - Insane   \n\nDifficulty :  ',
    );
    switch (difficulty) {
      case '1':
        diff = 1;
        break;
      case '2':
        diff = 1.5;
        break;
      case '3':
        diff = 2.0;
        break;
      default:
        console.log('\nSelect a valid option.\n');
        break;
    }
  }
  return diff;
}
// Select the number of levels
export function SelectLevelsCount() {
  if (levels === 0) {
    console.log('\nHow much floors the Castle should have ?');
    const levelCount: number = readlineSync.question(
      '\n1 - 10       2 - 20       3 - 30       5-50       10-100\n\nFloors max:  ',
    ) * 10;
    levels = levelCount;
  }
  return [levels, level];
}
// returns a coin after each won fight
export function Money(coins) {
  coins += 1;
  console.log(`You've earned 1 coins, you have ${coins} coins now`);
  return coins;
}
