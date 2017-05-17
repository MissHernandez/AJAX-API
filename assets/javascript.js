
var topics = ["Empire", "Orange is the New Black", "Scandal", "The Walking Dead", "House of Cards", "American Horror Story", "Breaking Bad"];

// Render Buttons from array.

function renderButtons() {

	$("#tv-buttons").empty();

	for (var i=0 ; i < topics.length ; i++) {
		var b = $("<button>");
		// b.attr("type", "button");
		b.attr("data-name", topics[i]);
		b.addClass("tvButton")
		b.text(topics[i]);
		$("#tv-buttons").append(b);
	};
};

renderButtons();

// Dynamically create buttons from user input.

$("#addTvShow").on("click", function(event) {

	event.preventDefault();

	var tvShow = $("#tv-input").val().trim();

	topics.push(tvShow);

	renderButtons();

});

// When I click on a button, display gifs for that button.

$("button").on("click", function() {

	$("#tv-gifs").empty();

	var show = $(this).attr("data-name");

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		
		var results = response.data;

		console.log(results);

		for (var i = 0 ; i < results.length ; i++) {

			var rating = results[i].rating;

			if (results[i].rating !== "r") {

				var showSpan = $("<span>Rating: " + rating + "</br></br></span>");

				var tvShowImg = $("<img>");

				tvShowImg.attr("src", results[i].images.fixed_height_still.url);
				tvShowImg.attr("data-still", results[i].images.fixed_height_still.url);
				tvShowImg.attr("data-animate", results[i].images.fixed_height.url);
				tvShowImg.attr("align", "left");

				showSpan.append(tvShowImg);
				$("#tv-gifs").append(showSpan);

			};

		};



	});

});
