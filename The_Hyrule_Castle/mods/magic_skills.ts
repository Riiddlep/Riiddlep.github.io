import { Character } from './character_creation';
import spells from './spells.json';

const readlineSync = require('readline-sync');

let move = 1;

function Heal(perso: Character, enemies, power: string) {
  for (let i = 0; i < spells.length; i += 1) {
    if (spells[i].name === power) {
      if (spells[i].cost <= perso.mp) {
        perso.mp -= spells[i].cost;
        const num = spells[i].effect.split('_');
        if (perso.hp + Number(num[num.length - 1]) > perso.baselife) {
          perso.hp
            += Number(num[num.length - 1])
            - (Number(num[num.length - 1]) - (perso.baselife - perso.hp));
          console.log(
            `You healed for ${
              Number(num[num.length - 1]) - (perso.baselife - perso.hp)
            }hp\n\n`,
          );
        } else {
          perso.hp += Number(num[num.length - 1]);
          console.log(`You healed for ${Number(num[num.length - 1])}\n\n`);
        }
      } else {
        console.log("You don't have enough mp to do that");
        Magic(perso, enemies);
      }
    }
  }
}

function Restore(perso: Character) {
  move = 1;
  for (let i = 0; i < spells.length; i += 1) {
    if (spells[i].name === 'Cheat Restore') {
      const num = spells[i].effect.split('_');
      if (perso.mp + Number(num[num.length - 1]) > perso.basemp) {
        perso.mp
          += Number(num[num.length - 1])
          - (Number(num[num.length - 1]) - (perso.basemp - perso.mp));
        console.log(
          `You restore for ${
            Number(num[num.length - 1]) - (perso.basemp - perso.mp)
          }mp\n\n`,
        );
      } else {
        perso.mp += Number(num[num.length - 1]);
        console.log(`You restore for ${Number(num[num.length - 1])}mp\n\n`);
      }
    }
  }
}

function Fireball(lanceur: Character, perso: Character, porter) {
  for (let i = 0; i < spells.length; i += 1) {
    if (spells[i].name === porter) {
      if (spells[i].cost <= lanceur.mp) {
        lanceur.mp -= spells[i].cost;
        perso.hp -= spells[i].dmg;
        console.log(`\nYou attacked and dealt ${spells[i].dmg} damage!!\n\n`);
        if (perso.hp < 0) {
          perso.hp = 0;
        }
      } else {
        console.log("You don't have enough mp to do that");
        Magic(lanceur, perso);
      }
    }
  }
}

export default function Magic(perso: Character, enemies: Character) {
  move = 1;
  if (
    perso.classes === 'Priest'
    || perso.classes === 'Monk'
    || perso.classes === 'Hero'
  ) {
    const result = readlineSync.question(
      'What skills do you wanna use ? \n -Heal: 10mp     -Fireball:10mp     -Return \n',
    );
    switch (result) {
      case 'Heal':
        if (perso.classes === 'Priest') {
          const heal: string = readlineSync.question(
            'What Heal do you wanna use ? \n -Heal:10mp     -Heal II:30mp     -Return \n',
          );
          switch (heal) {
            case 'Heal':
              Heal(perso, enemies, heal);
              break;
            case 'Heal II':
              Heal(perso, enemies, heal);
              break;
            case 'Return':
              Magic(perso, enemies);
              break;
            default:
              console.log('Choose a valid option');
              Magic(perso, enemies);
              break;
          }
        } else {
          Heal(perso, enemies, 'Heal');
        }
        break;
      case 'Fireball':
        Fireball(perso, enemies, 'Fireball');
        break;
      case 'Cheat':
        const cheat = readlineSync.question(
          'What skills do you wanna use ? \n -Heal     -Restore      -Fireball -Return \n',
        );
        switch (cheat) {
          case 'Heal':
            Heal(perso, enemies, 'Cheat Heal');
            break;
          case 'Restore':
            Restore(perso);
            break;
          case 'Fireball':
            Fireball(perso, enemies, 'Cheat Fireball');
            break;
          case 'Return':
            Magic(perso, enemies);
            break;
          default:
            console.log('Choose a valid option');
            Magic(perso, enemies);
            break;
        }
        break;
      case 'Return':
        move = 0;
        break;
      default:
        console.log('Choose a valid option');
        Magic(perso, enemies);
        break;
    }
    return [perso, enemies, move];
  }
  const result = readlineSync.question(
    'What skills do you wanna use ? \n  -Fireball\n',
  );
  switch (result) {
    case 'Fireball':
      Fireball(perso, enemies, 'Fireball');
      break;
    case 'Cheat':
      const cheat = readlineSync.question(
        'What skills do you wanna use ? \n -Heal     -Restore      -Fireball\n',
      );
      switch (cheat) {
        case 'Heal':
          Heal(perso, enemies, 'Cheat Heal');
          break;
        case 'Restore':
          Restore(perso);
          break;
        case 'Fireball':
          Fireball(perso, enemies, 'Cheat Fireball');
          break;
        default:
          console.log('Choose a valid option');
          Magic(perso, enemies);
          break;
      }
      break;
    default:
      console.log('Choose a valid option');
      Magic(perso, enemies);
      break;
  }
  return [perso, enemies, move];
}
