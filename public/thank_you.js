function searchByColor() {
	console.log("Searching by color....");
	var color = $("#color").val()
	console.log("Color: " + color);

	$.get("/search", {color:color}, function(data) {
		console.log("Back from the server with:");
		console.log(data);

		$("ulImages").append("<li>item1</li>");
		$("ulImages").append("<li>item1</li>");
		$("ulImages").append("<li>item1</li>");
	})
}