import readlineSync from 'readline-sync';
// Hero
const LifeBar = '#';
const LifeBarSetup = '.';
const nom = 'Link';
const baselife = 60;
let life = baselife;
const damage = 15;
const heal = baselife / 2;
// Enemy
let CurrentEnemy = 'Bokoblin';
let EnemyBaselife = 30;
let EnemyLife = EnemyBaselife;
let EnemyDamage = 5;
let EnemyHeal = EnemyBaselife / 4;

// Settings
let done: boolean = true;
let level = 1;
const levels = 10;
let rng = 0;

function DisplayPlayerLifeBar() {
  if (life < baselife / 2 && life > baselife / 4) {
    console.log('\x1b[34m%s\x1b[0m', `${nom}:`);
    console.log(
      '\x1b[33m%s\x1b[0m',
      `${life}hp - [${LifeBar.repeat(life)}${LifeBarSetup.repeat(
        baselife - life,
      )}]`,
    );
  } else if (life <= baselife / 4) {
    console.log('\x1b[34m%s\x1b[0m', `${nom}:`);
    console.log(
      '\x1b[31m%s\x1b[0m',
      `${life}hp - [${LifeBar.repeat(life)}${LifeBarSetup.repeat(
        baselife - life,
      )}]`,
    );
  } else {
    console.log('\x1b[34m%s\x1b[0m', `${nom}:`);
    console.log(
      '\x1b[32m%s\x1b[0m',
      `${life}hp - [${LifeBar.repeat(life)}${LifeBarSetup.repeat(
        baselife - life,
      )}]`,
    );
  }
  console.log('\n');
}

function DisplayFoeLifeBar() {
  if (EnemyLife < EnemyBaselife / 2 && EnemyLife > EnemyBaselife / 4) {
    console.log('\x1b[31m%s\x1b[0m', `${CurrentEnemy}:`);
    console.log(
      '\x1b[33m%s\x1b[0m',
      `${EnemyLife.toFixed(0)}hp - [${LifeBar.repeat(
        EnemyLife,
      )}${LifeBarSetup.repeat(EnemyBaselife - EnemyLife)}]`,
    );
  } else if (EnemyLife <= EnemyBaselife / 4) {
    console.log('\x1b[31m%s\x1b[0m', `${CurrentEnemy}:`);
    console.log(
      '\x1b[31m%s\x1b[0m',
      `${EnemyLife.toFixed(0)}hp - [${LifeBar.repeat(
        EnemyLife,
      )}${LifeBarSetup.repeat(EnemyBaselife - EnemyLife)}]`,
    );
  } else {
    console.log('\x1b[31m%s\x1b[0m', `${CurrentEnemy}:`);
    console.log(
      '\x1b[32m%s\x1b[0m',
      `${EnemyLife.toFixed(0)}hp - [${LifeBar.repeat(
        EnemyLife,
      )}${LifeBarSetup.repeat(EnemyBaselife - EnemyLife)}]`,
    );
  }
  console.log('\n');
}

function DisplayLevels() {
  console.log(`\n================== Floor ${level} ==================\n\n`);
}

function EnemyActions() {
  if (rng === 1) {
    if (EnemyLife + EnemyHeal > EnemyBaselife) {
      EnemyLife += EnemyHeal - (EnemyHeal - (EnemyBaselife - EnemyLife));
      console.log(
        `Enemy healed for ${(EnemyHeal - (EnemyBaselife - EnemyLife)).toFixed(
          0,
        )}hp`,
      );
    } else {
      EnemyLife += EnemyHeal;
      console.log(`Enemy healed for ${EnemyHeal.toFixed(0)}hp`);
    }
  } else {
    console.log(`\nEnemy attacked and dealts you ${EnemyDamage}`);
    life -= EnemyDamage;
  }

  if (life <= 0) {
    life = 0;
  }

  DisplayPlayerLifeBar();
  DisplayFoeLifeBar();
}

function Combat() {
  console.log(`\nYou encoutered a ${CurrentEnemy}\n`);
  DisplayPlayerLifeBar();
  DisplayFoeLifeBar();

  while (done === true) {
    rng = Math.floor(Math.random() * 3); // rng, l'adversaire fera soit un attaque soit un heal
    done = false;
    console.log('What are we going to do ?');
    const result = readlineSync.question(
      ' - A for attack  - H for heal \nAction:',
    );

    switch (result) {
      case 'A': // attack
        EnemyLife -= damage;
        if (EnemyLife <= 0) {
          EnemyLife = 0;
        }
        console.log(`\nYou attacked and dealt ${damage} damage!!`);

        DisplayPlayerLifeBar();
        DisplayFoeLifeBar();

        if (EnemyLife > 0) {
          EnemyActions();
        }

        done = true;
        break;
      case 'H': // heal
        if (life + heal > baselife) {
          life += heal - (heal - (baselife - life));
          console.log(`You healed for ${heal - (baselife - life)}hp`);
        } else {
          life += heal;
          console.log(`You healed for ${heal}`);
        }

        DisplayPlayerLifeBar();
        DisplayFoeLifeBar();

        if (EnemyLife > 0) {
          EnemyActions();
        }

        done = true;
        break;
      default:
        done = true;
        console.log('\nSelect an action.\n');

        break;
    }
    console.log('-------------------------------------------------\n\n');

    if (EnemyLife === 0) {
      console.log(`${CurrentEnemy} died !!\n\n`);
      break;
    }
    if (life === 0) {
      console.log('You died...\n\n');
      break;
    }
  }
}

function Jeu() {
  console.log('\nQuit at any time with ^c\n');

  for (let i = 0; i < levels; i += 1) {
    DisplayLevels();
    Combat();
    level += 1;
    EnemyLife = EnemyBaselife;
    if (level === 10) {
      CurrentEnemy = 'Ganon';
      EnemyBaselife = 150;
      EnemyLife = EnemyBaselife;
      EnemyDamage = 20;
      EnemyHeal = EnemyBaselife / 15;
    }
    if (life === 0) {
      console.log(
        `\nYou went all the way to the floor ${
          level - 1
        }, but your adventure ends here...\n\n\n`,
      );
      break;
    }
  }
  if (life !== 0) {
    console.log(
      '\nCongratulations, you have beaten Ganon, you saved the kingdom!\n\n',
    );
  }
}
function Start() {
  console.log(
    '\x1b[31m%s\x1b[0m',
    ` \nYou are ${nom}, you have to save the kingdom of Hyrule by beating the evil Ganon and brings peace back in the kingdom. 
    \nThe kingdom counts on you ${nom}.`,
  );
  Jeu();
}

Start();
