import { Character } from './character_creation';
import load from './saves.json';

let { exp } = load.Sauvegarde[(load.Sauvegarde.length) - 1];
let { niv } = load.Sauvegarde[(load.Sauvegarde.length) - 1];

export function Expe(perso:Character) { // calculates xp gains and leveling up
  const expw = Math.floor(Math.random() * (51 - 15)) + 15;
  console.log(`You earn ${expw} experience points`);
  exp += expw;

  if (exp >= 100) {
    niv += 1;
    console.log(`Congrats ! You just levels up ! You're now level ${niv}`);
    perso.str = Number(perso.str) + 3;
    perso.baselife += 3;
    perso.hp += 3;
    perso.basemp += 5;
    perso.mp += 5;
    console.log(`Your damage are ${perso.str} now, your life increase of 3 and your magic increase of 5`);
    exp = 0;
  } return perso.str;
}
export function Exper() { // display xp
  return [exp, niv];
}
