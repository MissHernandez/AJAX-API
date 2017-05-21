
$(document).ready(function() {

var topics = ["Empire", "Orange is the New Black", "Scandal", "The Walking Dead", "House of Cards", "American Horror Story", "Breaking Bad"];

function displayGifs() {

	$("#tv-gifs").empty();	

	var show = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

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
				tvShowImg.attr("data-state", "still");
				tvShowImg.attr("data-still", results[i].images.fixed_height_still.url);
				tvShowImg.attr("data-animate", results[i].images.fixed_height.url);
				tvShowImg.attr("align", "left");
				tvShowImg.attr("class", "show");

				showSpan.append(tvShowImg);
				$("#tv-gifs").append(showSpan);
			};
		}
	});

};

// Render buttons from array.

function renderButtons() {

	$("#tv-buttons").empty();

	for (var i = 0 ; i < topics.length ; i++) {
		var b = $("<button>");
		b.attr("data-name", topics[i]);
		b.addClass("tvButton")
		b.text(topics[i]);
		$("#tv-buttons").append(b);
	};
};

// When new TV Show is submitted, add to list of buttons.

$("#addTvShow").on("click", function(event) {

	event.preventDefault();

	var tvShow = $("#tv-input").val().trim();

	topics.push(tvShow);

	renderButtons();

});

//Click to animate GIF.
$(document).on("click", "img", animateGif);


function animateGif() {

	var state = $(this).attr("data-state");
	
		if (state === "still") {

			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
			console.log(this);
		}

		else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");

		}
};



$(document).on("click", ".tvButton", displayGifs);

renderButtons();

});



