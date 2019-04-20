let randomNames : string[] = ["Velocosaur", "Robototron", "Swimmfiish", "Brootgroot", "Deathwatch", "Pikahmoone"];
let randomBodyparts : string[] = ["red", "blue", "green", "cyan", "magenta", "yellow"]

function randomIntRange(min : number, max : number) : number{

	if (min > max){
		var x = min;
		var y = max;

		max = x;
		min = y;
	}
	return Math.floor(Math.random() * ((Math.floor(max)+1) - Math.ceil(min))) + Math.ceil(min);
}

function randomFromArray(array : any[]) : any{
	return array[Math.floor(Math.random() * array.length)];
}


function capitalise(s : string) : string
{
    return s.charAt(0).toUpperCase() + s.slice(1);
}


abstract class Trait{

	constructor(public baseName : string, public readableName : string, public level : number, public spawnChance : number, public despawnChance : number, public mutateUpChance : number, public mutateDownChance : number){}

	toString() : string{
		return this.readableName;
	}
}


class StatTrait extends Trait {

	constructor(baseName : string, readableName : string, level : number,  spawnChance : number, despawnChance : number, mutateUpChance : number, mutateDownChance : number, public stats : (creature : Creature) => void){
		super(baseName, readableName, level, spawnChance, despawnChance, mutateUpChance, mutateDownChance);
	}
}


class ValueTrait extends Trait {

	constructor(baseName : string, readableName : string, level : number,  spawnChance : number, despawnChance : number, mutateUpChance : number, mutateDownChance : number, public value : (creature : Creature) => void){
		super(baseName, readableName, level, spawnChance, despawnChance, mutateUpChance, mutateDownChance);
	}
}

const TRAIT_LIST : object = {

	////////////////////////////////////////
	// 			STAT TRAITS				  //
	////////////////////////////////////////

	//DAMAGE
	"damage1": new StatTrait("damage", "Damage (1)", 1, 0.01, 0.01, 0.25, 0.00, function(creature : Creature) : void {creature.attackDamage += 1; }),
	"damage2": new StatTrait("damage", "Damage (2)", 2, 0.01, 0.01, 0.25, 0.10, function(creature : Creature) : void {creature.attackDamage += 2; }),
	"damage3": new StatTrait("damage", "Damage (3)", 3, 0.01, 0.01, 0.25, 0.10, function(creature : Creature) : void {creature.attackDamage += 3; creature.maxHealth -= 1; }),
	"damage4": new StatTrait("damage", "Damage (4)", 4, 0.01, 0.01, 0.33, 0.25, function(creature : Creature) : void {creature.attackDamage += 4; creature.maxHealth -= 3; }),
	"damage5": new StatTrait("damage", "Damage (5)", 5, 0.01, 0.01, 0.00, 0.33, function(creature : Creature) : void {creature.attackDamage += 5; creature.maxHealth -= 5; }),

	"speed1": new StatTrait("speed", "Speed (1)", 1, 0.01, 0.01, 0.25, 0.00, function(creature : Creature) : void {creature.attackSpeed += 1; }),
	"speed2": new StatTrait("speed", "Speed (2)", 2, 0.01, 0.01, 0.25, 0.10, function(creature : Creature) : void {creature.attackSpeed += 2; }),
	"speed3": new StatTrait("speed", "Speed (3)", 3, 0.01, 0.01, 0.25, 0.10, function(creature : Creature) : void {creature.attackSpeed += 3; creature.armour -= 1; }),
	"speed4": new StatTrait("speed", "Speed (4)", 4, 0.01, 0.01, 0.33, 0.25, function(creature : Creature) : void {creature.attackSpeed += 4; creature.armour -= 3; }),
	"speed5": new StatTrait("speed", "Speed (5)", 5, 0.01, 0.01, 0.00, 0.33, function(creature : Creature) : void {creature.attackSpeed += 5; creature.armour -= 5; }),

	////////////////////////////////////////
	// 			MISC TRAITS				  //
	////////////////////////////////////////

	"cute1": new ValueTrait("cute", "Kinda Cute", 1, 0.01, 0.01, 0.10, 0.00, function(creature : Creature) : void {creature.value *= 1.05; }),
	"cute2": new ValueTrait("cute", "Cute",       2, 0.01, 0.01, 0.10, 0.10, function(creature : Creature) : void {creature.value *= 1.10; }),
	"cute3": new ValueTrait("cute", "Super Cute", 3, 0.01, 0.01, 0.00, 0.10, function(creature : Creature) : void {creature.value *= 1.15; }),

	"ugly1": new ValueTrait("ugly", "Kinda Ugly", 1, 0.01, 0.01, 0.10, 0.00, function(creature : Creature) : void {creature.value *= 0.95; }),
	"ugly2": new ValueTrait("ugly", "Ugly",       2, 0.01, 0.01, 0.10, 0.10, function(creature : Creature) : void {creature.value *= 0.90; }),
	"ugly3": new ValueTrait("ugly", "Super Ugly", 3, 0.01, 0.01, 0.00, 0.10, function(creature : Creature) : void {creature.value *= 0.85; })
}


class Creature {

	maxHealth : number = 5;
	currentHealth : number = this.maxHealth;

	attackDamage : number = 5;
	attackSpeed : number = 0.2;
	dodge : number = 0.2;
	armour : number = 1;

	value : number = 1; //Base sale price - affected by traits, etc.
	

	constructor(public name? : string, public fertility? : number, public bodypartSlots? : object, public bodyparts? : object){
		this.name = name || randomFromArray(randomNames),
		this.fertility = fertility || randomIntRange(2, 6);
		this.bodypartSlots = bodypartSlots || {"head": randomIntRange(1, 2), "arm": randomIntRange(2, 6), "leg": randomIntRange(2, 6),}
		this.bodyparts = bodyparts || {"head": new Bodypart(randomBodyparts[Math.floor(Math.random() * randomBodyparts.length)], randomIntRange(1, 2)),
									   "arm": new Bodypart(randomBodyparts[Math.floor(Math.random() * randomBodyparts.length)], randomIntRange(1, 4)),
									   "leg": new Bodypart(randomBodyparts[Math.floor(Math.random() * randomBodyparts.length)], randomIntRange(1, 4))};


		//Update stats based on traits from bodyparts
		let thisCreature : Creature = this;
		Object.keys(this.bodyparts).forEach(function(bodypart){
			thisCreature.bodyparts[bodypart].traits.forEach(function(trait){
				if(trait instanceof StatTrait){
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

	render() : any{
		
		let bodypartsString : string = "";
		let thisCreature : Creature = this;
		Object.keys(this.bodyparts).forEach(function(bodypart){
			bodypartsString += '<p><strong>'+capitalise(bodypart)+' Type:</strong> '+thisCreature.bodypartSlots[bodypart]+' x <img src="./images/'+thisCreature.bodyparts[bodypart].image+'.png" alt="'+thisCreature.bodyparts[bodypart].image+'"><br/>';

			if (thisCreature.bodyparts[bodypart].traits.length > 0){
				bodypartsString += '('
				thisCreature.bodyparts[bodypart].traits.forEach(function(trait){
					bodypartsString += trait.readableName + ", ";
				});
				bodypartsString = bodypartsString.slice(0, -2);
				bodypartsString += ')';
			}
			bodypartsString += '</p>';
		})
		
		return "<p><strong>Name:</strong> "+this.name+"</p>"+
				"<p><strong>Health:</strong> "+this.currentHealth+"/"+this.maxHealth+"</p>"+
				"<p><strong>Attack Damage:</strong> "+this.attackDamage+"</p>"+
				"<p><strong>Attack Speed:</strong> "+Math.round((this.attackSpeed * 100))+"%</p>"+
				"<p><strong>Dodge:</strong> "+Math.round((this.dodge * 100))+"%</p>"+
				"<p><strong>Armour:</strong> "+this.armour+"</p>"+
				"<p><strong>Fertility:</strong> "+this.fertility+"</p>"+
				bodypartsString;
	}


	breed(other : Creature) : Creature[]{

		let offsprings : Creature[] = [];

		//Create random number of offspring based on parents' fertility
		for(let i = 0; i < randomIntRange(this.fertility, other.fertility); i++){

			let newCreaturebodypartSlots : object = {};
			let newCreaturebodyparts : object = {};

			let thisCreature : Creature = this;

			//Choose bodyparts at random from each parent
			//TODO: Account for other bodypartSlots (e.g. wings, tail, etc) that may not be on Both parents
			//let bodypartSlots : string[] = Array.from(new Set(Object.keys(this.bodypartSlots).concat(Object.keys(other.bodypartSlots))));
			let bodypartSlots : string[] = ["head", "arm", "leg"];
			bodypartSlots.forEach(function(bodypart){
				newCreaturebodypartSlots[bodypart] = randomFromArray([thisCreature.bodypartSlots[bodypart], other.bodypartSlots[bodypart]]) || 1;
				newCreaturebodyparts[bodypart] = randomFromArray([thisCreature.bodyparts[bodypart], other.bodyparts[bodypart]]);
			});

			//Create offspring using parents' features
			let newName : string = (Math.random() < 0.5) ? this.name.slice(0, this.name.length / 2) + other.name.slice(other.name.length / 2, other.name.length) : other.name.slice(0, other.name.length / 2) + this.name.slice(this.name.length / 2, this.name.length);
			let offspring : Creature = new Creature(
				newName,
				randomIntRange(this.fertility, other.fertility),
				newCreaturebodypartSlots,
				newCreaturebodyparts
			);


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

			offsprings.push(offspring)
		}

		return offsprings;
	}
	
}


class Bodypart{

	constructor(public image? : string, public traitSlots? : number, public traits? : Trait[]){
		this.image = image || randomFromArray(randomBodyparts);
		this.traitSlots = traitSlots || randomIntRange(1, 4);
		this.traits = traits || this.generateStartingTraits(this.traitSlots); //This might cause body parts that don't have any traits to spontaneously generate traits!!!! 
	}

	private generateStartingTraits(traitSlots : number) : Trait[]{

		let traits : Trait[] = [];
		let traitKeys : string[] = Object.keys(TRAIT_LIST);

		//Generate between 1 and MAX traits
		for(let i = 0; i < randomIntRange(1, traitSlots); i++){

			let trait : Trait = TRAIT_LIST[traitKeys[Math.floor(Math.random() * traitKeys.length)]];
			//TODO: CHECK THAT THERE ARE NO TYPE-DUPLICATES (e.g. Damage1 *and* Damage3)
			traits.push(trait);
		}

		console.log(traits);
		return traits;
	}
}