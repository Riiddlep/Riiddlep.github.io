import bosses from './bosses.json';
import { Character, Try } from './character_creation';
import classes from './classes.json';
import races from './races.json';

function difficulty(enemy: Character, diff) {
  enemy.hp *= diff;
  enemy.heal *= diff;
  enemy.baselife *= diff;
  enemy.str *= diff;
  enemy.mp *= diff;
  enemy.int *= diff;
  enemy.def *= diff;
  enemy.res *= diff;
  enemy.spd *= diff;
  enemy.luck *= diff;
  return enemy;
}

// fetch and return a random enemy with the Try function
export function Enemies(diff, type) {
  let enemy: Character = {
    name: '',
    race: '',
    classes: '',
    baselife: 0,
    hp: 0,
    heal: 0,
    str: 0,
    alignment: '',
    mp: 0,
    int: 0,
    def: 0,
    res: 0,
    spd: 0,
    luck: 0,
    rarity: 0,
  };
  const res = Try();
  const rand = [];
  for (let i = 0; i < type.length; i += 1) {
    if (res === type[i].rarity) {
      rand.push(i);
    }
  }
  const ale = Math.floor(Math.random() * rand.length);
  enemy = type[rand[ale]];
  enemy.alignment = classes[type[rand[ale]].class - 1].alignment;
  enemy.race = races[type[rand[ale]].races - 1].name;
  enemy.classes = classes[type[rand[ale]].class - 1].name;
  enemy.baselife = enemy.hp;
  enemy.heal = Math.floor(enemy.baselife / 4);
  enemy = difficulty(enemy, diff);
  return enemy;
}

export function Bosses(diff, num) {
  // fetch and return ganon
  let enemy: Character = {
    name: '',
    race: '',
    classes: '',
    baselife: 0,
    hp: 0,
    heal: 0,
    str: 0,
    alignment: '',
    mp: 0,
    int: 0,
    def: 0,
    res: 0,
    spd: 0,
    luck: 0,
    rarity: 0,
  };
  enemy = bosses[num];
  enemy.alignment = classes[bosses[num].class - 1].alignment;
  enemy.race = races[bosses[num].races - 1].name;
  enemy.classes = classes[bosses[num].class - 1].name;
  enemy.baselife = enemy.hp;
  enemy.heal = Math.floor(enemy.baselife / 4);
  enemy = difficulty(enemy, diff);
  return enemy;
}
