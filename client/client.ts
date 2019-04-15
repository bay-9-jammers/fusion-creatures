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
}

function backToBodySelector() {
	$("#creature-creator-stage-title").text("Select body type");
	$("#creature-creator-stage-description").text("");
	$("#body-controls").show();
	$("#draw-body-controls").hide();
}


var state = {
	creature_creator: {
		body_type: 0
	}
};
