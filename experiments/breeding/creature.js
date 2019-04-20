var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var randomNames = ["Velocosaur", "Robototron", "Swimmfiish", "Brootgroot", "Deathwatch", "Pikahmoone"];
var randomBodyparts = ["red", "blue", "green", "cyan", "magenta", "yellow"];
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
var Trait = /** @class */ (function () {
    function Trait(baseName, readableName, level, spawnChance, despawnChance, mutateUpChance, mutateDownChance) {
        this.baseName = baseName;
        this.readableName = readableName;
        this.level = level;
        this.spawnChance = spawnChance;
        this.despawnChance = despawnChance;
        this.mutateUpChance = mutateUpChance;
        this.mutateDownChance = mutateDownChance;
    }
    Trait.prototype.toString = function () {
        return this.readableName;
    };
    return Trait;
}());
var StatTrait = /** @class */ (function (_super) {
    __extends(StatTrait, _super);
    function StatTrait(baseName, readableName, level, spawnChance, despawnChance, mutateUpChance, mutateDownChance, stats) {
        var _this = _super.call(this, baseName, readableName, level, spawnChance, despawnChance, mutateUpChance, mutateDownChance) || this;
        _this.stats = stats;
        return _this;
    }
    return StatTrait;
}(Trait));
var ValueTrait = /** @class */ (function (_super) {
    __extends(ValueTrait, _super);
    function ValueTrait(baseName, readableName, level, spawnChance, despawnChance, mutateUpChance, mutateDownChance, value) {
        var _this = _super.call(this, baseName, readableName, level, spawnChance, despawnChance, mutateUpChance, mutateDownChance) || this;
        _this.value = value;
        return _this;
    }
    return ValueTrait;
}(Trait));
var TRAIT_LIST = {
    ////////////////////////////////////////
    // 			STAT TRAITS				  //
    ////////////////////////////////////////
    //DAMAGE
    "damage1": new StatTrait("damage", "Damage (1)", 1, 0.01, 0.01, 0.25, 0.00, function (creature) { creature.attackDamage += 1; }),
    "damage2": new StatTrait("damage", "Damage (2)", 2, 0.01, 0.01, 0.25, 0.10, function (creature) { creature.attackDamage += 2; }),
    "damage3": new StatTrait("damage", "Damage (3)", 3, 0.01, 0.01, 0.25, 0.10, function (creature) { creature.attackDamage += 3; creature.maxHealth -= 1; }),
    "damage4": new StatTrait("damage", "Damage (4)", 4, 0.01, 0.01, 0.33, 0.25, function (creature) { creature.attackDamage += 4; creature.maxHealth -= 3; }),
    "damage5": new StatTrait("damage", "Damage (5)", 5, 0.01, 0.01, 0.00, 0.33, function (creature) { creature.attackDamage += 5; creature.maxHealth -= 5; }),
    "speed1": new StatTrait("speed", "Speed (1)", 1, 0.01, 0.01, 0.25, 0.00, function (creature) { creature.attackSpeed += 1; }),
    "speed2": new StatTrait("speed", "Speed (2)", 2, 0.01, 0.01, 0.25, 0.10, function (creature) { creature.attackSpeed += 2; }),
    "speed3": new StatTrait("speed", "Speed (3)", 3, 0.01, 0.01, 0.25, 0.10, function (creature) { creature.attackSpeed += 3; creature.armour -= 1; }),
    "speed4": new StatTrait("speed", "Speed (4)", 4, 0.01, 0.01, 0.33, 0.25, function (creature) { creature.attackSpeed += 4; creature.armour -= 3; }),
    "speed5": new StatTrait("speed", "Speed (5)", 5, 0.01, 0.01, 0.00, 0.33, function (creature) { creature.attackSpeed += 5; creature.armour -= 5; }),
    ////////////////////////////////////////
    // 			MISC TRAITS				  //
    ////////////////////////////////////////
    "cute1": new ValueTrait("cute", "Kinda Cute", 1, 0.01, 0.01, 0.10, 0.00, function (creature) { creature.value *= 1.05; }),
    "cute2": new ValueTrait("cute", "Cute", 2, 0.01, 0.01, 0.10, 0.10, function (creature) { creature.value *= 1.10; }),
    "cute3": new ValueTrait("cute", "Super Cute", 3, 0.01, 0.01, 0.00, 0.10, function (creature) { creature.value *= 1.15; }),
    "ugly1": new ValueTrait("ugly", "Kinda Ugly", 1, 0.01, 0.01, 0.10, 0.00, function (creature) { creature.value *= 0.95; }),
    "ugly2": new ValueTrait("ugly", "Ugly", 2, 0.01, 0.01, 0.10, 0.10, function (creature) { creature.value *= 0.90; }),
    "ugly3": new ValueTrait("ugly", "Super Ugly", 3, 0.01, 0.01, 0.00, 0.10, function (creature) { creature.value *= 0.85; })
};
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
                if (trait instanceof StatTrait) {
                    trait.stats(thisCreature);
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
                    bodypartsString += trait.readableName + ", ";
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
        var _loop_2 = function (i) {
            var trait = TRAIT_LIST[traitKeys[Math.floor(Math.random() * traitKeys.length)]];
            //TODO: CHECK THAT THERE ARE NO TYPE-DUPLICATES (e.g. Damage1 *and* Damage3)
            var duplicate = false;
            traits.forEach(function (t) {
                if (Object.prototype.toString.call(trait) == Object.prototype.toString.call(t)) {
                    duplicate = true;
                }
            });
            if (!duplicate) {
                traits.push(trait);
            }
        };
        //Generate between 1 and MAX traits
        for (var i = 0; i < randomIntRange(1, traitSlots); i++) {
            _loop_2(i);
        }
        return traits;
    };
    return Bodypart;
}());
