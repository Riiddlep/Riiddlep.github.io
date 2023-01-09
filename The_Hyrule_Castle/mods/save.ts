import { exit } from 'process';
import * as rl from 'readline-sync';

const editJsonFile = require('edit-json-file');

export const getInput = (question: string): any => rl.question(`${question}`);

export default function Save(
  perso,
  level,
  levels,
  difficulty,
  nive,
  expe,
  money,
) {
  let choix = false;
  while (!choix) {
    const dem = getInput('Do you wanna save ? Y/N');
    const file = editJsonFile(`${__dirname}/saves.json`);

    switch (dem) {
      case 'Y':
        file.append('Sauvegarde', {
          perso,
          exp: expe,
          niv: nive,
          coins: money,
          level,
          levels,
          difficulty,
        });
        file.save();
        choix = true;
        break;
      case 'N':
        choix = true;
        break;
      default:
        console.log('Take a valid option');
        break;
    }
  }
  while (choix === true) {
    const end = getInput('Do you wanna exit ? Y/N');
    switch (end) {
      case 'Y':
        exit();
        break;
      case 'N':
        choix = false;
        break;
      default:
        console.log('Take a valid option');
    }
  }
}
