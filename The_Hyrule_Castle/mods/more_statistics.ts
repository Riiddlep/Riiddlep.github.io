import { Character } from "./character_creation";
import { Adv, Remise } from "./basic_characteristics";
import { Room } from "./random_game_events";
import MoveSpecial, { Retour } from "./basic_characteristics_2";
import { Expe, Exper } from "./level_and_experience";
import { Money } from "./basic_game_customization";
import Magic from "./magic_skills";
import classes from "./classes.json";

const readlineSync = require("readline-sync");

const LifeBar = "♥";
const LifeBarSetup = ".";
let rng = 0;
let DefenseState = false;
const EnemyDefenseState = false;
let FleeRNG = 0;
let flee: boolean = false;
let SpecialMove = 1;
let coins = 0;
const level = 0;
let FleeCount = 0;
let dodge = 0;

const sum: Character = {
  name: "Link",
  race: "Hylian",
  classes: "Hero",
  baselife: 60,
  hp: 60,
  heal: 30,
  str: 15,
  alignment: "good",
  basemp: 30,
  mp: 30,
  int: 7,
  def: 8,
  res: 8,
  spd: 9,
  luck: 10,
  rarity: 1,
};

const enemy: Character = {
  name: "Dead Hand",
  race: "Hylian",
  classes: "Dark Mage",
  baselife: 40,
  hp: 20,
  heal: 10,
  str: 24,
  basemp: 20,
  mp: 20,
  int: 3,
  def: 2,
  res: 2,
  spd: 10,
  luck: 50,
  rarity: 3,
};

// explicit
function DisplayPlayerLifeBar(sum: Character) {
  console.log("\x1b[32m%s\x1b[0m", `${sum.name}:`);
  console.log(
    "\x1b[31m%s\x1b[0m",
    `${sum.hp}hp/${sum.baselife}hp - [${LifeBar.repeat(
      sum.hp
    )}${LifeBarSetup.repeat(sum.baselife - sum.hp)}]`
  );
}
// explicit
function DisplayPlayerMpBar(sum: Character) {
  console.log(
    "\x1b[34m%s\x1b[0m",
    `${sum.mp}mp/ ${sum.basemp}mp - [${LifeBar.repeat(
      sum.mp
    )}${LifeBarSetup.repeat(sum.basemp - sum.mp)}]`
  );
  console.log("\n");
}
// explicit
function DisplayFoeLifeBar(enemy: Character) {
  console.log("\x1b[31m%s\x1b[0m", `${enemy.name}:`);
  console.log(
    "\x1b[31m%s\x1b[0m",
    `${enemy.hp.toFixed(0)}hp - [${LifeBar.repeat(
      enemy.hp
    )}${LifeBarSetup.repeat(enemy.baselife - enemy.hp)}]`
  );

  console.log("\n");
}

// show lifebar and mpbar
function Life(sum: Character, enemy: Character) {
  DisplayPlayerLifeBar(sum);
  DisplayPlayerMpBar(sum);
  DisplayFoeLifeBar(enemy);
}
// return the attacktype
function AttackType(enemy: Character) {
  for (let i = 0; i < classes.length; i += 1) {
    if (classes[i].name === enemy.classes) {
      return classes[i].attack_type;
    }
  }
}
// execute the attack
function Attack(turn: Character, enemy: Character, enemydefense) {
  const type = AttackType(turn);
  let attack = turn.str;
  const rng = Math.random();
  if (rng < turn.luck / 100) {
    attack *= 2;
  }
  if (type === "physical") {
    attack = Math.floor(attack - attack * (enemy.def / 100));
  } else {
    attack = Math.floor(attack - attack * (enemy.res / 100));
  }
  attack = Adv(attack, turn.race, turn.classes, enemy.race, enemy.classes);

  if (enemydefense) {
    attack = Math.floor(attack / 2);
  }
  enemy.hp -= attack;
  if (enemy.hp <= 0) {
    enemy.hp = 0;
  }
  console.log(`${turn.name} dealts ${attack} to ${enemy.name} \n`);
  return enemy;
}
// Execute the enemy heal
function EnemyHeal(enemy) {
  if (enemy.hp + enemy.heal > enemy.baselife) {
    enemy.hp += enemy.heal - (enemy.heal - (enemy.baselife - enemy.hp));
    console.log(
      `Enemy healed for ${(enemy.heal - (enemy.baselife - enemy.hp)).toFixed(
        0
      )}hp \n\n`
    );
  } else {
    enemy.hp += enemy.heal;
    console.log(`Enemy healed for ${enemy.heal.toFixed(0)}hp \n\n`);
  }
  return enemy;
}
// execute the enemy's turn
export function EnemyActions(enemy: Character, sum: Character) {
  rng = Math.floor(Math.random() * 5);
  if (rng === 1) {
    EnemyHeal(enemy);
  } else {
    sum = Attack(enemy, sum, DefenseState);
  }
}
// whole combat execution with players actions
export function Combat(enemy: Character, sum: Character) {
  FleeRNG = Math.floor(Math.random() * 8);
  let done = false;
  while (!done) {
    console.log("What are we going to do ?");
    const result = readlineSync.question(
      " 1- A for attack       3- S for Skills       5-U for your Special Move (Once per fight)\n 2- D for defense      4- F for flee         6- Character for your character file) \nAction: "
    );

    switch (result) {
      case "A":
      case "1": // attack
        enemy = Attack(sum, enemy, EnemyDefenseState);
        done = true;
        break;
      case "D":
      case "2":
        console.log("\nYou take a defensive position.\n\n");
        DefenseState = true;
        done = true;
        break;

      case "S":
      case "3":
        const move = Magic(sum, enemy);
        if (move[2] === 1) {
          done = true;
          break;
        }
        break;
      case "F":
      case "4":
        if (FleeRNG === 1) {
          flee = true;
        } else {
          console.log(
            "\nYou tried to escape... but the enemy blocks the exit.\n\n"
          );
        }
        done = true;
        break;
      case "U":
      case "5":
        if (SpecialMove === 1) {
          MoveSpecial(sum);

          Attack(sum, enemy, EnemyDefenseState);
          Retour(sum);

          SpecialMove = 0;

          done = true;
          break;
        } else {
          console.log("You already use your Special Move\n\n");
          break;
        }
      case "Character":
      case "6":
        console.log("\n", sum);
        console.log(`Level: ${Exper()[1]} Experience: ${Exper()[0]}/100`);

        break;
      default:
        console.log("\nSelect a valid action.\n");

        break;
    }
  }
}

function Flee(FleeCount) {
  FleeCount += 1;
  console.log("You fled");
  console.log(`You fled ${FleeCount} times`);
  return FleeCount;
}
export function Spd(sum: Character, enemy: Character) {
  while (enemy.hp !== 0 && sum.hp !== 0) {
    console.log("-------------------------------------------------\n\n");
    Life(sum, enemy);
    if (sum.spd > enemy.spd) {
      Combat(enemy, sum);
      if (flee === true) {
        FleeCount = Flee(FleeCount);
        flee = false;
        break;
      }
      if (sum.hp !== 0 && enemy.hp !== 0) {
        EnemyActions(enemy, sum);
      }
    } else {
      EnemyActions(enemy, sum);
      if (sum.hp !== 0 && enemy.hp !== 0) {
        Combat(enemy, sum);
        if (flee === true) {
          FleeCount = Flee(FleeCount);
          flee = false;
          break;
        }
      }
    }
  }
  if (enemy.hp === 0) {
    console.log(`${enemy.name} died !!\n\n`);
    SpecialMove = 1;
    coins = Money(coins);
    sum.str = Expe(sum);
    const [argent, vie] = Room(level, sum, coins);
    coins = argent;
    sum = vie;
  } else if (sum.hp === 0) {
    console.log("You died...\n\n");
  }
}
function Dodge(us: Character, them: Character) {
  dodge = 0;
  const chance = (us.spd - them.spd) / 100;

  if (chance > 0) {
    const d = Math.random();
    if (d < chance) {
      dodge = 1;
    }
  }

  return dodge;
}
