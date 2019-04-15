function go_to_screen(screen_name: String) {
	$(".screen").hide();
	$("#" + screen_name).show();
}


$(".button.go-to-screen").bind("click", function() {
	go_to_screen($(this).data("target"));
});


var state = {
	creature_creator: {
		body_type: 0
	}
};
