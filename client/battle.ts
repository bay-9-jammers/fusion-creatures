export interface Stats {
    maxHealth: number;
    attack: number;
    //Percentage value between 0 and 1
    attackSpeed: number;
    //Percentage value between 0 and 1
    dodge: number;
    armour: number;
}

export class Creature implements Stats {
    health: number;

    maxHealth: number;
    attack: number;
    attackSpeed: number;
    dodge: number;
    armour: number;

    constructor(stats: Stats) {
        this.maxHealth = stats.maxHealth;
        this.attack = stats.attack;
        this.attackSpeed = stats.attackSpeed;
        this.dodge = stats.dodge;
        this.armour = stats.armour;

        this.health = this.maxHealth;
    }
}

function calculateCreatureDamageOnOtherCreature(creature1: Creature, creature2: Creature): number {
    return Math.max(creature1.attack - creature2.armour, 0);
}

function inflictDamageOnCreature(damage: number, creature: Creature) {
    creature.health -= damage;
}

export function simulateBattle(creature1: Creature, creature2: Creature) {
    //Iterate turns
    //On each turn:
    // Check if attacks
    // Calculate Damage
    // Check Dodge
    // Engage
    let currentTurn = 0;
    let creature1LastAttackTurn = Number.NEGATIVE_INFINITY;
    let creature2LastAttackTurn = Number.NEGATIVE_INFINITY;

    while(creature1.health > 0 && creature2.health > 0) {
        console.log("~~~~~~~~~~~~Turn ", currentTurn, "~~~~~~~~~~~~");
        let creature1Attacks = creatureAttacksOnTurn(creature1, currentTurn, creature1LastAttackTurn);
        let creature2Attacks = creatureAttacksOnTurn(creature2, currentTurn, creature2LastAttackTurn);
        let creature1Dodges = creatureDodges(creature1);
        let creature2Dodges = creatureDodges(creature2);

        if(creature1Attacks && !creature2Dodges) {
            let damage = calculateCreatureDamageOnOtherCreature(creature1, creature2);
            inflictDamageOnCreature(damage, creature2);
            creature1LastAttackTurn = currentTurn;
            console.log("Creature 1 attacks for " + damage + " damage! Creature 2 has " + creature2.health + " health remaining.")
        } else if (creature1Attacks && creature2Dodges) {
            console.log("Creature 1 attacks, but creature 2 dodges!");
        } else if (!creature1Attacks) {
            console.log("Creature 1 waits to attack");

        }


        if(creature2Attacks && !creature1Dodges) {
            let damage = calculateCreatureDamageOnOtherCreature(creature2, creature1);
            inflictDamageOnCreature(damage, creature1);
            creature2LastAttackTurn = currentTurn;
            console.log("Creature 2 attacks for " + damage + " damage! Creature 1 has " + creature1.health + " health remaining.")
        } else if (creature2Attacks && creature1Dodges) {
            console.log("Creature 2 attacks, but creature 1 dodges!")
        } else if (!creature2Attacks) {
            console.log("Creature 2 waits to attack");

        }

        currentTurn++;
    }
}

function creatureDodges(creature: Creature): boolean {
    return Math.random() < creature.dodge;
}

function creatureAttacksOnTurn(creature: Creature, currentTurn: number, lastTurnAttacked: number): boolean {
    let turnDifference = currentTurn - lastTurnAttacked;
    let attackFrequency = 1 / creature.attackSpeed;

    return turnDifference >= attackFrequency;
}

export function battleTest() {
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
}
