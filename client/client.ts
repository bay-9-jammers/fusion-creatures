// Inform Typescript we've got JQuery in the global namespace
declare let $: any;

function go_to_screen(screen_name: String) {
	$(".screen").hide();
	$("#" + screen_name).show();
}

const NUM_BODY_TYPES = 5;


$(".button.go-to-screen").bind("click", function(this: any) {
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
	$("#body-canvas").bind("mousedown", function(this: any, e: any) {
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

$(".tool").bind("click", function(this: any) {
	state.creature_creator.selected_tool = $(this).data("tool");
	updateCreatureCreatorDrawingBody();
});

$(".color").bind("click", function(this: any) {
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

import { battleTest } from "./battle";

$(".button.simulate-battle").on("click", battleTest);
