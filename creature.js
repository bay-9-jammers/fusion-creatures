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
var Creature = /** @class */ (function () {
    function Creature(name, fertility, bodypartSlots, bodyparts) {
        this.name = name;
        this.fertility = fertility;
        this.bodypartSlots = bodypartSlots;
        this.bodyparts = bodyparts;
        this.name = name || randomFromArray(randomNames),
            this.fertility = fertility || randomIntRange(2, 6);
        this.bodypartSlots = bodypartSlots || { "head": randomIntRange(1, 2), "arm": randomIntRange(2, 6), "leg": randomIntRange(2, 6) };
        this.bodyparts = bodyparts || { "head": new Bodypart(randomBodyparts[Math.floor(Math.random() * randomBodyparts.length)], randomIntRange(1, 4), []),
            "arm": new Bodypart(randomBodyparts[Math.floor(Math.random() * randomBodyparts.length)], randomIntRange(1, 3), []),
            "leg": new Bodypart(randomBodyparts[Math.floor(Math.random() * randomBodyparts.length)], randomIntRange(1, 3), []) };
    }
    Creature.prototype.getStats = function () {
        Object.keys(this.bodyparts).forEach(function (bodypart) {
            this.bodyparts[bodypart].traits.forEach(function (trait) {
            });
        });
        return [];
    };
    Creature.prototype.render = function () {
        var bodypartsString = "";
        var thisCreature = this;
        Object.keys(this.bodyparts).forEach(function (bodypart) {
            bodypartsString += '<p><strong>' + capitalise(bodypart) + ' Type:</strong> ' + thisCreature.bodypartSlots[bodypart] + ' x <img src="./images/' + thisCreature.bodyparts[bodypart].image + '.png" alt="' + thisCreature.bodyparts[bodypart].image + '"><br/>(' + thisCreature.bodyparts[bodypart].traits.join(", ") + ')</p>';
        });
        return "<p><strong>Name:</strong> " + this.name + "</p>" +
            "<p><strong>Fertility:</strong> " + this.fertility + "</p>" +
            bodypartsString;
    };
    Creature.prototype.breed = function (other) {
        var offsprings = [];
        var _loop_1 = function (i) {
            var newCreaturebodypartSlots = {};
            var thisCreature = this_1;
            Object.keys(this_1.bodypartSlots).concat(Object.keys(other.bodypartSlots)).forEach(function (bodypart) {
                newCreaturebodypartSlots[bodypart] = randomFromArray([thisCreature.bodypartSlots[bodypart], other.bodypartSlots[bodypart]]) || 0;
            });
            var bodyparts = void 0;
            var offspring = new Creature(this_1.name.slice(0, this_1.name.length / 2) + other.name.slice(other.name.length / 2, other.name.length), randomIntRange(Math.min(this_1.fertility, other.fertility), Math.max(this_1.fertility, other.fertility)), newCreaturebodypartSlots);
            offsprings.push(offspring);
        };
        var this_1 = this;
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
    }
    return Bodypart;
}());
var Trait = /** @class */ (function () {
    function Trait(name, description, spawnChance, despawnChance) {
        this.name = name;
        this.description = description;
        this.spawnChance = spawnChance;
        this.despawnChance = despawnChance;
    }
    return Trait;
}());
var Stat = /** @class */ (function () {
    function Stat() {
    }
    return Stat;
}());
