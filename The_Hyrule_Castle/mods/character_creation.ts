import * as rl from 'readline-sync';
import races from './races.json';
import classes from './classes.json';
import player from './players.json';

export const getInput = (question: string): any => rl.question(`${question}\n`);

export interface Character {
  name: string;
  race?: any;
  classes?: any;
  baselife?: number;
  hp: number;
  heal?: number;
  str: number;
  alignment?: string;
  basemp?: number;
  mp: number;
  int: number;
  def: number;
  res: number;
  spd: number;
  luck: number;
  rarity: number;
}

let rare = 0;
// Random Number Generator to get random enemies each fight, based on their rarity
export function Try() {
  rare = 0;
  const d = Math.random();
  if (d < 0.5) {
    // 0.1 - 0.5
    rare = 1;
  } else if (d < 0.8) {
    // 0.5 - 0.8
    rare = 2;
  } else if (d < 0.95) {
    // 0.8-0.95
    rare = 3;
  } else if (d < 0.99) {
    // 0.95-0.98
    rare = 4;
  } else if (d < 1) {
    // 0.99
    rare = 5;
  }
  return rare;
}

let res = 0;
let perso = 0;
// display each race with each's forces and weaknesses against each other
export function Race() {
  console.log('\n==== List of Races ====\n');
  for (let i = 0; i < races.length - 1; i += 1) {
    const force: any = [];
    const faiblesse: any = [];
    for (let k = 0; k < races[i].weaknesses.length; k += 1) {
      const num: any = races[i].weaknesses[k];
      faiblesse.push(` ${races[num - 1].name}`);
    }
    for (let j = 0; j < races[i].strengths.length; j += 1) {
      const num: any = races[i].strengths[j];
      force.push(` ${races[num - 1].name}`);
    }
    console.log(
      `- ${races[i].name} \n strength : ${force} \n weakness : ${faiblesse} \n`,
    );
  }
}
// display each class with each's forces and weaknesses against each other, display alignement
export function Classes() {
  console.log('\n==== List of Classes ==== \n');
  for (let i = 0; i < classes.length - 1; i += 1) {
    const force: any = [];
    const faiblesse: any = [];
    for (let k = 0; k < classes[i].weaknesses.length; k += 1) {
      const num: any = classes[i].weaknesses[k];
      faiblesse.push(` ${classes[num - 1].name}`);
    }
    for (let j = 0; j < classes[i].strengths.length; j += 1) {
      const num: any = classes[i].strengths[j];
      force.push(` ${classes[num - 1].name}`);
    }
    console.log(
      `- ${classes[i].name} \n strength : ${force} \n weakness : ${faiblesse} \n alignment : ${classes[i].alignment} \n`,
    );
  }
}
export function Creation() {
  // engage the character creation process
  console.log('\n=== Creation === \n');

  let intro = false;
  const sum: Character = {
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
  while (intro === false) {
    let pres = false;
    while (pres === false) {
      const dem = getInput(
        "\nWrite 'info' for all the details then write 'next' to create your character",
      );
      switch (dem) {
        case 'info':
          Race();
          Classes();
          break;
        case 'next':
          pres = true;
          break;
        default:
          console.log('Put an valid text');
      }
    }
    sum.name = getInput("\nWhat's your name ?");
    let var2 = 0;
    while (var2 !== 2) {
      const race = getInput('\nChoose a race.');
      for (let i = 0; i < races.length; i += 1) {
        if (race === races[i].name) {
          sum.race = race;
          var2 += 1;
        }
      }
      const classe = getInput('\nChoose a class.');
      for (let i = 0; i < classes.length; i += 1) {
        if (classe === classes[i].name) {
          sum.classes = classe;
          sum.alignment = classes[i].alignment;
          var2 += 1;
        }
      }
      if (var2 !== 2) {
        console.log('Choose a valid race and a valid class');
        var2 = 0;
      }
    }
    var2 = 0;
    while (var2 === 0) {
      console.log(
        '\nDistribute 140 points among your life, attack, magical power, intelligence, defense,resistance, speed and luck',
      );
      sum.hp = Number(getInput('\nWhat is your amount of life points ?'));
      sum.str = Number(getInput('\nWhat is your amount of attack points ?'));
      sum.mp = Number(
        getInput('\nWhat is your amount of magical power points ?'),
      );
      sum.int = Number(
        getInput('\nWhat is your amount of intelligence points ?'),
      );
      sum.def = Number(getInput('\nWhat is your amount of defense points ?'));
      sum.res = Number(
        getInput('\nWhat is your amount of resistance points ?'),
      );
      sum.spd = Number(getInput('\nWhat is your amount of speed points ?'));
      sum.luck = Number(getInput('\nWhat is your amount of luck points ?'));

      if (
        Number(sum.hp)
          + Number(sum.str)
          + Number(sum.mp)
          + Number(sum.int)
          + Number(sum.def)
          + Number(sum.res)
          + Number(sum.spd)
          + Number(sum.luck)
        === 140
      ) {
        var2 = 1;
      } else {
        console.log('You have more or lesss than 140 points');
      }
    }
    console.log(
      `\nYour character is ${sum.name}, a ${sum.race} ${sum.classes}, you have ${sum.hp} hp and ${sum.str} attack points. Your alignment is ${sum.alignment}`,
    );
    const verif = getInput('Do you confirm [Yes/No]?');
    switch (verif) {
      case 'Yes':
        intro = true;
        break;
      case 'No':
        break;

      default:
        console.log('Put an valid text');
    }
  }
  return sum;
}
// display the selection screen choose between creating a character and a random given character
export function SelectPerso() {
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
  const choix = getInput('\n1- Create a new character   2- Random character');
  switch (choix) {
    case '1':
      sum = Creation();
      return sum;
      break;
    case '2':
      res = Try();
      for (let i = 0; i < player.length; i += 1) {
        if (player[i].rarity === res) {
          perso = i;
        }
      }
      sum = player[perso];
      sum.race = races[player[perso].race - 1].name;
      sum.alignment = classes[player[perso].classes - 1].alignment;
      sum.classes = classes[player[perso].classes - 1].name;
      console.log(
        `\nYour character is ${sum.name}, a ${sum.race} ${sum.classes}, you have ${sum.hp} hp and ${sum.str} attack points. Your alignment is ${sum.alignment}`,
      );
      break;
    case 'CamCam':
      perso = 5;
      sum = player[perso];
      sum.race = races[player[perso].race - 1].name;
      sum.alignment = classes[player[perso].classes - 1].alignment;
      sum.classes = classes[player[perso].classes - 1].name;
      console.log(
        `\nYour character is ${sum.name}, a ${sum.race} ${sum.classes}, you have ${sum.hp} hp and ${sum.str} attack points. Your alignment is ${sum.alignment}`,
      );
      break;
    default:
      break;
  }
  return sum;
}
