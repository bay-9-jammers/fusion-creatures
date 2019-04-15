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


var state = {
	creature_creator: {
		body_type: 0
	}
};
