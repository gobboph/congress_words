
window.onload=function() {
   	// Get the Object by ID
   	var a = document.getElementById("svg");
   	// Get the SVG document inside the Object tag
   	var svgDoc = a.contentDocument;
   	// Get one of the SVG items by ID;
   	var svgItem = svgDoc.getElementsByClassName("state");
   	//svgItem = $('path[class = "state"]');
   	// Set the colour to something else
   	for (var i=0; i<svgItem.length; i++) {
	   	svgItem[i].setAttribute("fill", "#696969");
   	}
};



//trying dictionary
var number_of_congressmen = {'WA':9, 'OR':5, 'CA':53, 'NV':3, 'AK':1, 'HI':2,
'ID':2, 'MT':1, 'WY':1, 'UT':3, 'AZ':8, 'NM':3, 'CO':7, 'ND':1, 'SD':1,
'NE':3, 'KS':4, 'OK':5, 'TX':32, 'LA':7, 'AR':4, 'MO':9, 'IA':5, 'MN':8,
'WI':8, 'IL':19, 'MI':15, 'IN':9, 'KY':6, 'TN':9, 'AL':7, 'MS':4, 'GA':13,
'FL':25, 'SC':6, 'NC':13, 'VA':11, 'WV':3, 'OH':18, 'PA':19, 'NY':29,
'VT':1, 'NH':2, 'ME':2, 'MA':10, 'RI':2, 'CT':5, 'NJ':13, 'DE':1, 'MD':8, 'DC':1};

//console.log(number_of_congressmen.WA);


function codeWord(word) {
	var word = document.getElementById("word").value;
	$("#typed_word").html(word);

	

	// Get the Object by ID
   	var svgElem = document.getElementById("svg");
   	// Get the SVG document inside the Object tag
   	var svgDoc = svgElem.contentDocument;
   	// Get one of the SVG items by class;
   	var svgAllItems = svgDoc.getElementsByClassName("state");


   	//Setting 3 different colors according to how many congressmen they have

	for (var key in number_of_congressmen){
		for (var i=0;i<svgAllItems.length;i++){

			// fixing Michingan
			if (svgAllItems[i].id === 'MI-' || svgAllItems[i].id === 'SP-') {
				svgAllItems[i].setAttribute('id', 'MI');
			};

			//set Colors
			if (key === svgAllItems[i].id){
				//console.log('eccolo');
				console.log(key+' '+svgAllItems[i].id);
				if (parseInt(number_of_congressmen[key])<6){
					svgAllItems[i].setAttribute("fill", "#0f0");
				} else if (5<parseInt(number_of_congressmen[key]) && parseInt(number_of_congressmen[key])<16){
					svgAllItems[i].setAttribute("fill", "#00f");
				} else {
					svgAllItems[i].setAttribute("fill", "#f00");
				};
			} //else {
			// 	console.log('non cisti');
			// };
		};
	};


	


	// Get one of the SVG items by ID;
	var svgItem = svgDoc.getElementById(word);
	// Set the colour to something else
	svgItem.setAttribute("fill", "#000");

	return false;
};


$("#word-form").on("submit", function(e) {
	e.preventDefault();
	console.log( $("#word").val() );
	codeWord( $("#word").val() ); //need to define this function taking API's
	//return false;
});





//Function to just color a state





// Put this in function to use Snap instead of just js

// var svgElement=document.getElementById("svg"); 
// var s = Snap(svgElement);
// var s = Snap(1000,1000)
// Snap.load("img/states.svg", function (f) {
// 		var selection = f.select("#"+word).attr({fill:"#bada55"});
// 		s.append(f);
// 		selection.drag();
// 	});





