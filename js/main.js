
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
   	};
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
var number_of_congressmen = {'WA':12, 'OR':7, 'CA':55, 'NV':6, 'AK':3, 'HI':4,
'ID':4, 'MT':3, 'WY':3, 'UT':6, 'AZ':11, 'NM':5, 'CO':9, 'ND':3, 'SD':3,
'NE':5, 'KS':6, 'OK':7, 'TX':38, 'LA':8, 'AR':6, 'MO':10, 'IA':6, 'MN':10,
'WI':10, 'IL':21, 'MI':16, 'IN':11, 'KY':8, 'TN':11, 'AL':9, 'MS':6, 'GA':16,
'FL':29, 'SC':9, 'NC':15, 'VA':13, 'WV':5, 'OH':18, 'PA':20, 'NY':29,
'VT':3, 'NH':4, 'ME':4, 'MA':11, 'RI':4, 'CT':7, 'NJ':14, 'DE':3, 'MD':10, 'DC':3};

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
		//console.log(data);
		colourMyMap(data);
		//return data;
	};

	getData(myCallback);





	function colourMyMap(data){

		//Setting to light green color all the states that do not appear, i.e. they have not said word
		for (var i=0; i<svgAllItems.length; i++) {
		   	svgAllItems[i].setAttribute("fill", "#edf8e9");
   		};

		// Normalizing data
		for (var key in number_of_congressmen){
			for (var i=0; i<data.length; i++){
				//var check = 0;
				if (key === data[i][0]){
					data[i][1] = data[i][1] / number_of_congressmen[key];
				//	check = 1;
				};
			};
		};

		if (data.length != 0) {
			var MIN = min(data,1);
			var MAX = max(data,1);
			var colors = ("#edf8e9", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#005a32")



			for (var i=0; i<svgAllItems.length;i++){
				for (var j=0; j<data.length; j++){
					if (svgAllItems[i].id === data[j][0]){
						if (data[j][1] > (MAX-MIN) * 5 / 6){
							svgAllItems[i].setAttribute('fill', "#005a32");
						} else if (data[j][1] > (MAX-MIN) * 4 / 6){
							svgAllItems[i].setAttribute('fill',"#238b45");
						} else if (data[j][1] > (MAX-MIN) * 3 / 6){
							svgAllItems[i].setAttribute('fill', "#41ab5d");
						} else if (data[j][1] > (MAX-MIN) * 2 / 6){
							svgAllItems[i].setAttribute('fill',"#74c476");
						} else if (data[j][1] > (MAX-MIN) / 6) {
							svgAllItems[i].setAttribute('fill',"#a1d99b");
						} else if (data[j][1] > 0){
							svgAllItems[i].setAttribute('fill',"#c7e9c0");
						} else {
							svgAllItems[i].setAttribute('fill',"#edf8e9");
						};
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
			if (double_vector[i][column]>MAX){
				MAX = double_vector[i][column];
			};
		};
		return MAX;
	};


	return false;
};


$("#word-form").on("submit", function(e) {
	e.preventDefault();
	console.log( $("#word").val() );
	codeWord( $("#word").val() ); // Define codeword to do whatever I want to do with word
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





