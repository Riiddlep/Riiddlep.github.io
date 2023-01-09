import objects from './objects.json';
import { Try } from './character_creation';

export default function Test(Inventory) {
  const res = Try();
  const rand = [];
  for (let i = 0; i < objects.length; i += 1) {
    if (res === objects[i].rarity) {
      rand.push(i);
    }
  }
  const ale = Math.floor(Math.random() * rand.length);
  Inventory.push(objects[rand[ale]].name);
  return Inventory;
}
