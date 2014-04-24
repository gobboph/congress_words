
function codeWord(word) {
	var word = document.getElementById("word").value;
	$("#typed_word").html(word);


//	var svgElement=document.getElementById("svg"); 
//	var s = Snap(svgElement);

//	var s = Snap(1000,1000)

	// Snap.load("img/states.svg", function (f) {
	// 		var selection = f.select("#"+word).attr({fill:"#bada55"});
	// 		s.append(f);
	// 		selection.drag();
	// 	});

	// Get the Object by ID
	var svgElem = document.getElementById("svg");
	// Get the SVG document inside the Object tag
	var svgDoc = svgElem.contentDocument;
	// // Get one of the SVG items by ID;
	var svgItem = svgDoc.getElementById(word);
	// Set the colour to something else
	svgItem.setAttribute("fill", "#bada55");

	return false;
};

// window.onload=function() {
//    	// Get the Object by ID
//    	var a = document.getElementById("svg");
//    	// Get the SVG document inside the Object tag
//    	var svgDoc = a.contentDocument;
//    	// Get one of the SVG items by ID;
//    	var svgItem = svgDoc.getElementById("NY");
//    	// Set the colour to something else
//    	svgItem.setAttribute("fill", "#bada55");
// };

$("#word-form").on("submit", function(e) {
	e.preventDefault();
	console.log( $("#word").val() );
	codeWord( $("#word").val() ); //need to define this function taking API's
	//return false;
});


