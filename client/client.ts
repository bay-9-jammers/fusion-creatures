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
	$("#body-canvas").bind("click", function() {
		alert("A");
	})
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


var state = {
	creature_creator: {
		body_type: 0,
		selected_tool: "pencil",
		selected_color: "000"
	}
};

var tools = {
	pencil: function(ctx, x, y, color) {

	},

	bucket: function(ctx, x, y, color) {

	},

	eraser: function(ctx, x, y, color) {
		
	}
}