
// Color the whole map grey
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


// Function to show response after api call
function showResponse (response) {
    RESPONSE = response;
    if (this && this.url && (typeof(this.url) == "string")) {
        var anchor = jQuery("#url");
        anchor.text(this.url.toString());
        anchor.attr('href', this.url.toString());
    }
    jQuery("#output").text(JSON.stringify(response, null, '  '));
    //console.log('AVERE');
}


// Dictionary with congress members per state
var number_of_congressmen = {'WA':9, 'OR':5, 'CA':53, 'NV':3, 'AK':1, 'HI':2,
'ID':2, 'MT':1, 'WY':1, 'UT':3, 'AZ':8, 'NM':3, 'CO':7, 'ND':1, 'SD':1,
'NE':3, 'KS':4, 'OK':5, 'TX':32, 'LA':7, 'AR':4, 'MO':9, 'IA':5, 'MN':8,
'WI':8, 'IL':19, 'MI':15, 'IN':9, 'KY':6, 'TN':9, 'AL':7, 'MS':4, 'GA':13,
'FL':25, 'SC':6, 'NC':13, 'VA':11, 'WV':3, 'OH':18, 'PA':19, 'NY':29,
'VT':1, 'NH':2, 'ME':2, 'MA':10, 'RI':2, 'CT':5, 'NJ':13, 'DE':1, 'MD':8, 'DC':1};

//console.log(number_of_congressmen.WA);


//Main function

function codeWord(word) {
	var word = document.getElementById("word").value;
	$("#typed_word").html(word);

	
	
	// Get the Object by ID
   	var svgElem = document.getElementById("svg");
   	// Get the SVG document inside the Object tag
   	var svgDoc = svgElem.contentDocument;
   	// Get one of the SVG items by class;
   	var svgAllItems = svgDoc.getElementsByClassName("state");

   	// fixing Michingan
	for (var i=0;i<svgAllItems.length;i++){
			if (svgAllItems[i].id === 'MI-' || svgAllItems[i].id === 'SP-') {
				svgAllItems[i].setAttribute('id', 'MI');
			};
	};
	
	   	// API call
	function getData(myCallback){
   		var query_params = { 'apikey': '2cd8dea668b840f989b145e88cb2be80',
					 //'per_page': 3,
		   			 'phrase': word,
		   			 'sort': 'count desc'
		 			};

		var endpoint = "http://capitolwords.org/api/phrases/state.json";

		//var data = new Array();

		var options = {
  			data: query_params,
  			type: 'GET',
  			dataType: 'jsonp',
	  		success: myCallback,
			error: function(){
				$("#status").html('There was an error loading the data.');
			}
		};

		//var request = jQuery.ajax(endpoint,options).done(showResponse);
		$.ajax(endpoint,options);

	};

	//var data = new Array();

	function myCallback(jsonData){
		var data = new Array();
		//var data = jsonData.results;
		for (var i=0;i<jsonData.results.length;i++){
			data.push([jsonData.results[i]['state'],jsonData.results[i]['count']]);
		};
		console.log('data '+data.length);
		console.log(typeof(data[0]));
		console.log(data[0][0]+' '+data[0][1]);
		colourMyMap(data);
		//return data;
	};

	getData(myCallback);





	function colourMyMap(data){
		var rate = 0
		// Normalizing data
		for (var key in number_of_congressmen){
			for (var i=0; i<data.length; i++){
				if (key === data[i][0]){
					data[i][1] = data[i][1] / number_of_congressmen[key];
				};
			};
		};

		for (var i=0; i<svgAllItems.length;i++){
			for (var j=0; j<data.length; j++){
				if (svgAllItems[i].id === data[j][0]){
					if (data[j][1]<200){
						svgAllItems[i].setAttribute("fill", "#0f0");
					} else {
						svgAllItems[i].setAttribute("fill", "#00f");
					};
				};
			};
		};
			
	};



	function min(double_vector, column) {
		var MIN = double_vector[0][column];
		for (var i=0;i<double_vector.length;i++){
			if (double_vector[i][column]<MIN){
				MIN = double_vector[i][column];
			};
		};
		return MIN;
	};


	function max(double_vector, column) {
		var MAX = double_vector[0][column];
		for (var i=0;i<double_vector.length;i++){
			if (double_vector[i][column]>MIN){
				MAX = double_vector[i][column];
			};
		};
		return MAX;
	};




   	//Setting 3 different colors according to how many congressmen they have

	// for (var key in number_of_congressmen){
	// 	for (var i=0;i<svgAllItems.length;i++){

	// 		// fixing Michingan
	// 		if (svgAllItems[i].id === 'MI-' || svgAllItems[i].id === 'SP-') {
	// 			svgAllItems[i].setAttribute('id', 'MI');
	// 		};

	// 		//set Colors
	// 		if (key === svgAllItems[i].id){
	// 			//console.log('eccolo');
	// 			//console.log(key+' '+svgAllItems[i].id);
	// 			if (parseInt(number_of_congressmen[key])<6){
	// 				svgAllItems[i].setAttribute("fill", "#0f0");
	// 			} else if (5<parseInt(number_of_congressmen[key]) && parseInt(number_of_congressmen[key])<16){
	// 				svgAllItems[i].setAttribute("fill", "#00f");
	// 			} else {
	// 				svgAllItems[i].setAttribute("fill", "#f00");
	// 			};
	// 		} //else {
	// 		// 	console.log('non cisti');
	// 		// };
	// 	};
	// };

	


	// // Get one of the SVG items by ID;
	// var svgItem = svgDoc.getElementById(word);
	// // Set the colour to something else
	// svgItem.setAttribute("fill", "#000");

	return false;
};


$("#word-form").on("submit", function(e) {
	e.preventDefault();
	console.log( $("#word").val() );
	codeWord( $("#word").val() ); //need to define this function taking API's
	//return false;
});







// Put this in function to use Snap instead of just js

// var svgElement=document.getElementById("svg"); 
// var s = Snap(svgElement);
// var s = Snap(1000,1000)
// Snap.load("img/states.svg", function (f) {
// 		var selection = f.select("#"+word).attr({fill:"#bada55"});
// 		s.append(f);
// 		selection.drag();
// 	});





