import races from './races.json';
import classes from './classes.json';

let debase = 0;

// calculates damages modifications according to races and classes
export function Adv(attaque, myrace, myclass, hisrace, hisclass) {
  const perso = [myrace, myclass];
  const enemy = [hisrace, hisclass];
  const cate = [races, classes];
  debase = attaque;
  for (let k = 0; k < cate.length; k += 1) {
    const force = [];
    const faible = [];
    for (let i = 0; i < cate[k].length; i += 1) {
      if (perso[k] === cate[k][i].name) {
        force.push(cate[k][i].strengths);
        faible.push(cate[k][i].weaknesses);
      }
    }
    if (force[0].length !== 0) {
      for (let j = 0; j < force[0].length; j += 1) {
        const a: number = Number(force[0][j]);
        if (cate[k][a - 1].name === enemy[k]) {
          attaque = Math.floor(Number(attaque) * 1.3);
        }
      }
    }
    if (faible[0].length !== 0) {
      for (let j = 0; j < faible[0].length; j += 1) {
        const b: number = Number(faible[0][j]);
        if (cate[k][b - 1].name === enemy[k]) {
          attaque = Math.floor(Number(attaque) / 1.3);
        }
      }
    }
  }

  if (attaque > debase) {
    console.log('\n\x1b[33m%s\x1b[0m', 'Crushing hit');
  } else if (attaque < debase) {
    console.log('\n\x1b[33m%s\x1b[0m', 'Glancing hit');
  }
  return attaque;
}

// set attack back to default
export function Remise(attaque) {
  attaque = debase;
  return attaque;
}
