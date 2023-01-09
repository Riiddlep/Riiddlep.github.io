import { Exper } from './level_and_experience';
import {
  GameTitleScreen,
  DifficultySelectorScreen,
  SelectLevelsCount,
} from './basic_game_customization';
import { Enemies, Bosses } from './monster_custom';
import { Character } from './character_creation';

import Save from './save';
import enemies from './enemies.json';
import bosses from './bosses.json';
import load from './saves.json';
import { Spd } from './more_statistics';

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

let enemy: Character = {
  name: '',
  race: '',
  classes: '',
  baselife: 0,
  hp: 0,
  heal: 0,
  str: 0,
  basemp: 0,
  mp: 0,
  int: 0,
  def: 0,
  res: 0,
  spd: 0,
  luck: 0,
  rarity: 0,
};

const { coins } = load.Sauvegarde[load.Sauvegarde.length - 1];

let level = 1;
let levels = 0;

let FleeCount = 0;
let diff = 0;

// change enemy settings according to the situation

function VarSettings() {
  if (level % 10 === 0 && level !== levels) {
    enemy = Enemies(diff, bosses);
  } else if (FleeCount >= 4) {
    FleeCount = 0;
    enemy = Enemies(diff, bosses);
  } else if (level === levels) {
    enemy = Bosses(diff, 0);
  } else if (level === levels || sum.name === 'CamCam') {
    enemy = Bosses(diff, 7);
  } else {
    enemy = Enemies(diff, enemies);
  }
}
// Encounter text
function Encounter(monster: Character) {
  console.log(`\nYou encoutered a ${monster.name}\n`);
}
// called to display the floor you are currently at
function DisplayLevels() {
  console.log(`\n================== Floor ${level} ==================\n\n`);
}

function jeu() {
  // calls a few functions to execute the basic combat part of the game
  console.log('\nQuit at any time with ^c\n');

  for (let i = 0; i < levels; i += 1) {
    VarSettings();
    DisplayLevels();
    Encounter(enemy);
    Spd(sum, enemy);
    level += 1;
    if (sum.hp !== 0) {
      Save(sum, level, levels, diff, Exper()[1], Exper()[0], coins);
    }
    enemy.hp = enemy.baselife;

    if (sum.hp === 0) {
      if (sum.name === 'CamCam') {
        console.log('CamCam failed to perform a bash live coding and died');
      }
      console.log(
        `\nYou went all the way to the floor ${
          level - 1
        }, but your adventure ends here...\n\n\n`,
      );
      break;
    }
  }
  if (sum.hp !== 0) {
    console.log('\nCongratulations, you have beaten the Hyrule Castle !\n\n');
  }
}
// called function to start the game, link to other functions and states some variables
function Start() {
  sum = GameTitleScreen();
  diff = DifficultySelectorScreen();
  [levels, level] = SelectLevelsCount();

  console.log(
    '\x1b[31m%s\x1b[0m',
    ` \nYou are ${sum.name}, a ${sum.classes} ${sum.race}, you have to save the kingdom of Hyrule by beating the evil Ganon and brings peace back in the kingdom. 
    \nThe kingdom counts on you ${sum.classes}.`,
  );

  jeu();
}
Start();
