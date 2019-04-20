var randomNames = ["Velocosaur", "Robototron", "Swimmfiish", "Brootgroot", "Deathwatch", "Pikahmoone"];
var randomBodyparts = ["red", "blue", "green", "cyan", "magenta", "yellow"];
//TODO: Make Traits Classes Again
// abstract class Trait{
// 	constructor(public name : string, public level : number, public spawnChance : number, public despawnChance : number, public mutateUpChance : number, public mutateDownChance : number){}
// 	toString() : string{
// 		return this.name;
// 	}
// }
// class StatTrait extends Trait{
// 	constructor(name : string, level : number,  spawnChance : number, despawnChance : number, mutateUpChance : number, mutateDownChance : number, public stat : string){
// 		super(name, level, spawnChance, despawnChance, mutateUpChance, mutateDownChance);
// 	}
// }
var TRAIT_LIST = {
    ////////////////////////////////////////
    // 			STAT TRAITS				  //
    ////////////////////////////////////////
    //DAMAGE
    "damage1": {
        "name": "Damage (1)",
        "type": "stat",
        "stat": "damage",
        "level": 1,
        "stats": function (creature) { creature.attackDamage += 1; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.2,
        "mutateDownChance": 0
    },
    "damage2": {
        "name": "Damage (2)",
        "type": "stat",
        "stat": "damage",
        "level": 2,
        "stats": function (creature) { creature.attackDamage += 2; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.25,
        "mutateDownChance": 0.1
    },
    "damage3": {
        "name": "Damage (3)",
        "type": "stat",
        "stat": "damage",
        "level": 3,
        "stats": function (creature) { creature.attackDamage += 3; creature.maxHealth -= 1; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.25,
        "mutateDownChance": 0.1
    },
    "damage4": {
        "name": "Damage (4)",
        "type": "stat",
        "stat": "damage",
        "level": 4,
        "stats": function (creature) { creature.attackDamage += 4; creature.maxHealth -= 3; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.33,
        "mutateDownChance": 0.25
    },
    "damage5": {
        "name": "Damage (5)",
        "type": "stat",
        "stat": "damage",
        "level": 5,
        "stats": function (creature) { creature.attackDamage += 5; creature.maxHealth -= 5; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0,
        "mutateDownChance": 0.1
    },
    //ATTACK SPEED
    "speed1": {
        "name": "Speed (1)",
        "type": "stat",
        "stat": "speed",
        "level": 1,
        "stats": function (creature) { creature.attackSpeed += 0.1; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.2,
        "mutateDownChance": 0
    },
    "speed2": {
        "name": "Speed (2)",
        "type": "stat",
        "stat": "speed",
        "level": 2,
        "stats": function (creature) { creature.attackSpeed += 0.2; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.25,
        "mutateDownChance": 0.1
    },
    "speed3": {
        "name": "Speed (3)",
        "type": "stat",
        "stat": "speed",
        "level": 3,
        "stats": function (creature) { creature.attackSpeed += 0.3; creature.armour -= 1; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.25,
        "mutateDownChance": 0.1
    },
    "speed4": {
        "name": "Speed (4)",
        "type": "stat",
        "stat": "Speed",
        "level": 4,
        "stats": function (creature) { creature.attackSpeed += 0.4; creature.armour -= 3; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.33,
        "mutateDownChance": 0.25
    },
    "speed5": {
        "name": "Speed (5)",
        "type": "stat",
        "stat": "speed",
        "level": 5,
        "stats": function (creature) { creature.attackSpeed += 0.5; creature.armour -= 5; },
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0,
        "mutateDownChance": 0.1
    },
    ////////////////////////////////////////
    // 			MISC TRAITS				  //
    ////////////////////////////////////////
    "cute1": {
        "name": "Kinda Cute",
        "type": "value",
        "value": function (creature) { creature.value *= 1.05; },
        "level": 1,
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.1,
        "mutateDownChance": 0
    },
    "cute2": {
        "name": "Cute",
        "type": "value",
        "value": function (creature) { creature.value *= 1.1; },
        "level": 2,
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.1,
        "mutateDownChance": 0.1
    },
    "cute3": {
        "name": "Super Cute",
        "type": "value",
        "value": function (creature) { creature.value *= 1.15; },
        "level": 3,
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.1,
        "mutateDownChance": 0
    },
    "ugly1": {
        "name": "Kinda Ugly",
        "type": "value",
        "value": function (creature) { creature.value *= 0.95; },
        "level": 1,
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.1,
        "mutateDownChance": 0
    },
    "ugly2": {
        "name": "Ugly",
        "type": "value",
        "value": function (creature) { creature.value *= 0.9; },
        "level": 2,
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.1,
        "mutateDownChance": 0.1
    },
    "ugly3": {
        "name": "Super Ugly",
        "type": "value",
        "value": function (creature) { creature.value *= 0.85; },
        "level": 3,
        "spawnChance": 0.01,
        "despawnChance": 0.01,
        "mutateUpChance": 0.1,
        "mutateDownChance": 0
    }
};
function randomIntRange(min, max) {
    if (min > max) {
        var x = min;
        var y = max;
        max = x;
        min = y;
    }
    return Math.floor(Math.random() * ((Math.floor(max) + 1) - Math.ceil(min))) + Math.ceil(min);
}
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function capitalise(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
var Creature = /** @class */ (function () {
    function Creature(name, fertility, bodypartSlots, bodyparts) {
        this.name = name;
        this.fertility = fertility;
        this.bodypartSlots = bodypartSlots;
        this.bodyparts = bodyparts;
        this.maxHealth = 5;
        this.currentHealth = this.maxHealth;
        this.attackDamage = 5;
        this.attackSpeed = 0.2;
        this.dodge = 0.2;
        this.armour = 1;
        this.value = 1; //Base sale price - affected by traits, etc.
        this.name = name || randomFromArray(randomNames),
            this.fertility = fertility || randomIntRange(2, 6);
        this.bodypartSlots = bodypartSlots || { "head": randomIntRange(1, 2), "arm": randomIntRange(2, 6), "leg": randomIntRange(2, 6) };
        this.bodyparts = bodyparts || { "head": new Bodypart(randomBodyparts[Math.floor(Math.random() * randomBodyparts.length)], randomIntRange(1, 2)),
            "arm": new Bodypart(randomBodyparts[Math.floor(Math.random() * randomBodyparts.length)], randomIntRange(1, 4)),
            "leg": new Bodypart(randomBodyparts[Math.floor(Math.random() * randomBodyparts.length)], randomIntRange(1, 4)) };
        //Update stats based on traits from bodyparts
        var thisCreature = this;
        Object.keys(this.bodyparts).forEach(function (bodypart) {
            thisCreature.bodyparts[bodypart].traits.forEach(function (trait) {
                if (trait["type"] == "stat") {
                    trait["stats"](thisCreature);
                }
            });
        });
        //If stats are below zero, set to a sensible minimum value
        this.maxHealth = (this.maxHealth > 0) ? this.maxHealth : 1;
        this.currentHealth = this.maxHealth;
        this.attackDamage = (this.attackDamage > 0) ? this.attackDamage : 1;
        this.attackSpeed = (this.attackSpeed > 0) ? this.attackSpeed : 0.05;
        this.dodge = (this.dodge > 0) ? this.dodge : 0.05;
        this.armour = (this.armour > 0) ? this.armour : 1;
    }
    Creature.prototype.render = function () {
        var bodypartsString = "";
        var thisCreature = this;
        Object.keys(this.bodyparts).forEach(function (bodypart) {
            bodypartsString += '<p><strong>' + capitalise(bodypart) + ' Type:</strong> ' + thisCreature.bodypartSlots[bodypart] + ' x <img src="./images/' + thisCreature.bodyparts[bodypart].image + '.png" alt="' + thisCreature.bodyparts[bodypart].image + '"><br/>';
            if (thisCreature.bodyparts[bodypart].traits.length > 0) {
                bodypartsString += '(';
                thisCreature.bodyparts[bodypart].traits.forEach(function (trait) {
                    bodypartsString += trait.name + ", ";
                });
                bodypartsString = bodypartsString.slice(0, -2);
                bodypartsString += ')';
            }
            bodypartsString += '</p>';
        });
        return "<p><strong>Name:</strong> " + this.name + "</p>" +
            "<p><strong>Health:</strong> " + this.currentHealth + "/" + this.maxHealth + "</p>" +
            "<p><strong>Attack Damage:</strong> " + this.attackDamage + "</p>" +
            "<p><strong>Attack Speed:</strong> " + Math.round((this.attackSpeed * 100)) + "%</p>" +
            "<p><strong>Dodge:</strong> " + Math.round((this.dodge * 100)) + "%</p>" +
            "<p><strong>Armour:</strong> " + this.armour + "</p>" +
            "<p><strong>Fertility:</strong> " + this.fertility + "</p>" +
            bodypartsString;
    };
    Creature.prototype.breed = function (other) {
        var offsprings = [];
        var _loop_1 = function (i) {
            var newCreaturebodypartSlots = {};
            var newCreaturebodyparts = {};
            var thisCreature = this_1;
            //Choose bodyparts at random from each parent
            //TODO: Account for other bodypartSlots (e.g. wings, tail, etc) that may not be on Both parents
            //let bodypartSlots : string[] = Array.from(new Set(Object.keys(this.bodypartSlots).concat(Object.keys(other.bodypartSlots))));
            var bodypartSlots = ["head", "arm", "leg"];
            bodypartSlots.forEach(function (bodypart) {
                newCreaturebodypartSlots[bodypart] = randomFromArray([thisCreature.bodypartSlots[bodypart], other.bodypartSlots[bodypart]]) || 1;
                newCreaturebodyparts[bodypart] = randomFromArray([thisCreature.bodyparts[bodypart], other.bodyparts[bodypart]]);
            });
            //Create offspring using parents' features
            var newName = (Math.random() < 0.5) ? this_1.name.slice(0, this_1.name.length / 2) + other.name.slice(other.name.length / 2, other.name.length) : other.name.slice(0, other.name.length / 2) + this_1.name.slice(this_1.name.length / 2, this_1.name.length);
            var offspring = new Creature(newName, randomIntRange(this_1.fertility, other.fertility), newCreaturebodypartSlots, newCreaturebodyparts);
            //TODO: THERE IS CURRENTLY A PROBLEM WITH BODYPARTS BEING PASSED BY REFERENCE;
            //THIS MEANS MUTATIONS WITH THE BELOW CODE MAKDE *ALL* TRAITS DISAPPEAR (INCLUDING THE PARENTS'!!!)
            // //Mutate offspring's traits - despawn, upgrade or downgrade
            // Object.keys(offspring.bodyparts).forEach(function(bodypart){
            // 	let newTraits : object[] = [];
            // 	offspring.bodyparts[bodypart].traits.forEach(function(trait){
            // 		if (trait.despawnChance < Math.random()){
            // 			return;
            // 		}
            // 		else if (trait.mutateUpChance < Math.random()){
            // 			let newTrait = TRAIT_LIST[trait.stat + (trait.level+1)];
            // 			newTraits.push(newTrait);
            // 		}
            // 		else if (trait.mutateDownChance < Math.random()){
            // 			let newTrait = TRAIT_LIST[trait.stat + (trait.level-1)];
            // 			newTraits.push(newTrait);
            // 		}
            // 		else{
            // 			newTraits.push(trait);
            // 		}
            // 	});
            // 	offspring.bodyparts[bodypart].traits = newTraits;
            // });
            //TODO: Also code traits randomly appearing (using trait[spawnChance])
            offsprings.push(offspring);
        };
        var this_1 = this;
        //Create random number of offspring based on parents' fertility
        for (var i = 0; i < randomIntRange(this.fertility, other.fertility); i++) {
            _loop_1(i);
        }
        return offsprings;
    };
    return Creature;
}());
var Bodypart = /** @class */ (function () {
    function Bodypart(image, traitSlots, traits) {
        this.image = image;
        this.traitSlots = traitSlots;
        this.traits = traits;
        this.image = image || randomFromArray(randomBodyparts);
        this.traitSlots = traitSlots || randomIntRange(1, 4);
        this.traits = traits || this.generateStartingTraits(this.traitSlots); //This might cause body parts that don't have any traits to spontaneously generate traits!!!! 
    }
    Bodypart.prototype.generateStartingTraits = function (traitSlots) {
        var traits = [];
        var traitKeys = Object.keys(TRAIT_LIST);
        //Generate between 1 and MAX traits
        for (var i = 0; i < randomIntRange(1, traitSlots); i++) {
            var trait = TRAIT_LIST[traitKeys[Math.floor(Math.random() * traitKeys.length)]];
            //TODO: CHECK THAT THERE ARE NO TYPE-DUPLICATES (e.g. Damage1 *and* Damage3)
            traits.push(trait);
        }
        return traits;
    };
    return Bodypart;
}());
