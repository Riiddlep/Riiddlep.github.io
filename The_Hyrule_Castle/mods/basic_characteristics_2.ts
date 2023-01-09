import { Character, Try } from './character_creation';
import Move from './specialmoves.json';
import classes from './classes.json';

let retour = 0;

// Use the Special Move for each class
export default function MoveSpecial(perso: Character) {
  retour = perso.str;
  const chance = Try();
  let classe = 0;
  for (let i = 0; i < classes.length; i += 1) {
    if (perso.classes === classes[i].name) {
      classe = classes[i].id;
    }
  }
  for (let i = 0; i < Move.length; i += 1) {
    if (classe === Move[i].classe) {
      console.log(
        `You use your special move ${Move[i].power}, ${Move[i].description}`,
      );
      perso.str += 2 * chance;
      const test = Move[i].upgrade.split('_');
      if (test.indexOf('hp') !== -1) {
        console.log('You gain some hp');
        perso.hp += Math.floor(perso.baselife / 2);
        if (perso.hp > perso.baselife) {
          perso.hp = perso.baselife;
        }
      }
    }
  }
  return perso;
}
// set attack back to default
export function Retour(sum: Character) {
  sum.str = retour;
  return sum;
}
