function searchByColor() {
	console.log("Searching by color....");
	var color = $("#color").val();
	console.log("Color: " + color);

	$.get("/search", {color:color}, function(data) {
		console.log("Back from the server with:");
		console.log(data);

		for(var i = 0; i < data.length; i++) {
			var image = data[i];

			console.log(image);
		}

		$("#ulImages").append("<li>#data.name</li>");
		$("#ulImages").append("<li>#data.image_file</li>");
		$("#ulImages").append("<li>item1</li>");
	});
}