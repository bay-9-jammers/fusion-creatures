function go_to_screen(screen_name: String) {
	$(".screen").hide();
	$("#" + screen_name).show();
}

const NUM_BODY_TYPES = 5;


$(".button.go-to-screen").bind("click", function() {
	go_to_screen($(this).data("target"));
});

function creatureCreatorPreviousBodyType() {
	state.creature_creator.body_type--;
	if (state.creature_creator.body_type < 0) {
		state.creature_creator.body_type = NUM_BODY_TYPES - 1;
	}
	updateCreatureCreatorBody();
}

function creatureCreatorNextBodyType() {
	state.creature_creator.body_type++;
	if (state.creature_creator.body_type >= NUM_BODY_TYPES) {
		state.creature_creator.body_type = 0;
	}
	updateCreatureCreatorBody();
}

function updateCreatureCreatorBody() {
	$("#creature-creator-preview > img").attr("src", "/images/bodies/" + state.creature_creator.body_type + ".png");
}

function beginDrawingBody() {
	$("#creature-creator-stage-title").text("Draw your monster's body");
	$("#creature-creator-stage-description").text("This should not include a head, arms, or legs. They will be drawn later.");
	$("#body-controls").hide();
	$("#draw-body-controls").show();
	$("#body-canvas").show();
	$("#body-canvas").bind("mousedown", function(e) {
		state.creature_creator.drawing_mouse_down = true;
		var canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("body-canvas");
		var ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

		var parentOffset = $(this).parent().offset()!;
		var x = e.pageX - parentOffset.left;
		var y = e.pageY - parentOffset.top;

		tools[state.creature_creator.selected_tool](ctx, x, y, state.creature_creator.selected_color);
	});

	$("#body-canvas").bind("mouseup", function() {
		state.creature_creator.drawing_mouse_down = false;
	});

	$("#body-canvas").bind("mousemove", function(e) {
		if (state.creature_creator.drawing_mouse_down) {
			var canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("body-canvas");
			var ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

			var parentOffset = $(this).parent().offset()!;
			var x = e.pageX - parentOffset.left;
			var y = e.pageY - parentOffset.top;

			tools[state.creature_creator.selected_tool](ctx, x, y, state.creature_creator.selected_color);
		}
	});
}

function backToBodySelector() {
	$("#creature-creator-stage-title").text("Select body type");
	$("#creature-creator-stage-description").text("");
	$("#body-controls").show();
	$("#draw-body-controls").hide();
	$("#body-canvas").hide();
	$("#body-canvas").unbind("click")
}

$(".tool").bind("click", function() {
	state.creature_creator.selected_tool = $(this).data("tool");
	updateCreatureCreatorDrawingBody();
});

$(".color").bind("click", function() {
	state.creature_creator.selected_color = $(this).data("color");
	updateCreatureCreatorDrawingBody();
});


function updateCreatureCreatorDrawingBody() {
	$(".tool").removeClass("selected");
	$(".tool[data-tool='" + state.creature_creator.selected_tool + "']").addClass("selected");

	$(".color").removeClass("selected");
	$(".color[data-color='" + state.creature_creator.selected_color + "']").addClass("selected");
}

interface CreatureCreatorState {
	body_type: number;
	selected_tool: string;
	selected_color: string;
	drawing_mouse_down: boolean;
}

interface State {
	creature_creator: CreatureCreatorState;
}


var state : State = {
	creature_creator: {
		body_type: 0,
		selected_tool: "pencil",
		selected_color: "000",
		drawing_mouse_down: false
	}
};


const DRAWING_RADIUS = 5;

interface Tools {
	[key: string]: (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => void;
}

let tools: Tools = {
	pencil: function(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
		ctx.fillStyle = "#" + color;
	    ctx.beginPath();
	    ctx.arc(x, y, DRAWING_RADIUS, 0, 2 * Math.PI);
	    ctx.fill();
	},

	bucket: function(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {

	},

	eraser: function(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
		ctx.save();
	    ctx.beginPath();
	    ctx.arc(x, y, DRAWING_RADIUS, 0, 2 * Math.PI);
        ctx.clip();
	    ctx.clearRect(x - DRAWING_RADIUS - 1, y - DRAWING_RADIUS - 1,
                      DRAWING_RADIUS * 2 + 2, DRAWING_RADIUS * 2 + 2);
	    ctx.restore();
	}
};

/**
 * BATTLE CODE
 */

interface Stats {
    maxHealth: number;
    attack: number;
    //Percentage value between 0 and 1
    attackSpeed: number;
    //Percentage value between 0 and 1
    dodge: number;
    armour: number;
}

class Creature implements Stats {
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

function simulateBattle(creature1: Creature, creature2: Creature) {
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

function battleTest() {
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


$(".button.simulate-battle").on("click", battleTest);
