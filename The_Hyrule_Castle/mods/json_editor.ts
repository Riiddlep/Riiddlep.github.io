import { getInput } from "./character_creation";
import { GameTitleScreen } from "./basic_game_customization";

const editJsonFile = require("edit-json-file");

const fichier = [
  "bosses",
  "classes",
  "enemies",
  "objects",
  "players",
  "races",
  "SpecialMove",
  "spells",
  "traps",
];

const fs = require("fs");

function SeeData() {
  for (let i = 0; i < fichier.length; i += 1) {
    console.log(i + 1, fichier[i]);
  }
  const modif = getInput("Which file do you want to see?");
  const file = editJsonFile(`${__dirname}/${fichier[modif - 1]}.json`);
  console.log(file.data);
}

function Updatedata() {
  for (let i = 0; i < fichier.length; i += 1) {
    console.log(i + 1, fichier[i]);
  }
  const modif = getInput("Which file do you want to edit?");

  const filepath = `${__dirname}/${fichier[modif - 1]}.json`;
  const data = JSON.parse(fs.readFileSync(filepath));
  for (let i = 0; i < data.length; i += 1) {
    console.log(i + 1, data[i]);
  }
  const line = getInput("Which line do you want to edit?");
  console.log(data[line - 1]);
  console.log(Object.keys(data[line - 1]));
  const column = getInput("Which column do you want to edit?");
  const write = getInput("The value ? :");
  data[line - 1][column] = write;
  fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
}

function CreateData() {
  for (let i = 0; i < fichier.length; i += 1) {
    console.log(i + 1, fichier[i]);
  }
  const modif = getInput("Which file do you want to modify?");
  const file = editJsonFile(`${__dirname}/${fichier[modif - 1]}.json`);

  const champ = Object.keys(file.data[0]);
  const info = { id: file.data.length + 1 };
  for (let i = 1; i < champ.length; i += 1) {
    const choix = getInput(`Enter a ${champ[i]} for the ${fichier[modif - 1]}`);
    info[champ[i]] = choix;
  }
  let choice = true;
  while (choice) {
    console.log(info);

    const save = getInput("\nDo you want to add this line? y/n");
    switch (save) {
      case "y":
        file.append("", info);
        file.save();
        choice = false;
        break;
      case "n":
        choice = false;
        break;
      default:
        console.log("\nChoose a valid option");
        break;
    }
  }
}

function Data() {}

export default function Editor() {
  let end = true;
  while (end) {
    const data = getInput(
      "        1 - See Data  2 - Create Data  3 - Modify Data  4 - Return        "
    );
    switch (data) {
      case "1":
        SeeData();
        break;
      case "2":
        CreateData();
        break;
      case "3":
        Updatedata();
        break;
      case "4":
        GameTitleScreen();
        break;
    }
    const finish = getInput("\nDid you finish ? y/n");
    switch (finish) {
      case "y":
        end = false;
        GameTitleScreen();
        break;
      case "n":
        break;
      default:
        break;
    }
  }
}
