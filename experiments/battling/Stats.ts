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