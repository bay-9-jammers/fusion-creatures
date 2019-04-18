import {Creature} from "./Stats";
import {simulateBattle} from "./Battle";

let testCreature1 = new Creature({
    maxHealth: 40,
    attack: 10,
    attackSpeed: 1,
    dodge: 0.1,
    armour: 2
});

let testCreature2 = new Creature({
    maxHealth: 40,
    attack: 10,
    attackSpeed: 1,
    dodge: 0.1,
    armour: 2
});

simulateBattle(testCreature1, testCreature2);