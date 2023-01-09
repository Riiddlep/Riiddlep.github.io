import * as rl from 'readline-sync';
import traps from './traps.json';
import { Character } from './character_creation';

export const getInput = (question: string): any => rl.question(`${question}\n`);
// generates random rooms, treasure rooms and trap rooms

export function Room(level: number, perso: Character, coins) {
  const chance = Math.random();
  if (chance < 0.35 || (level + 1) % 10 === 0) {
    const room = Math.floor(Math.random() * (traps.length + 1));

    if (room === traps.length) {
      console.log('You enter in a Treasure Room !');
      const piece = Math.floor(Math.random() * 3) + 3;
      coins += piece;
    } else {
      const requis = traps[room].requirement.replace('_', ' ').toLowerCase();
      console.log(
        `You enter in a ${traps[room].name} room \nYou need ${requis}`,
      );
      const require = requis.split(' ');
      const test = require[0];
      if (perso[test] >= require[1]) {
        console.log(
          'You meet the requirements, you win a coin and you can leave',
        );
        coins += 1;
      } else {
        const degat = Math.floor(Math.random() * 11) + 5;
        perso.hp -= Math.floor((perso.baselife * degat) / 100);
        console.log(
          "You don't meet the requirements, you loose",
          Math.floor((perso.baselife * degat) / 100),
          'hp as you try to leave',
        );
      }
    }
  }
  return [coins, perso];
}
