

updateData();

function updateData(){
	$.getJSON('http://127.0.0.1:5000/data', function(data) {
    //data is the JSON string
    
    if (data.length != parseInt($("#data").text())) {
    	$("#data").text(data.length);

    	for(var i=0; i<data.length; i++){
    		// Depth in CM
    		var depth = data[i][0];
    		console.log("Depth in cm = " + depth);

    		// Date
    		var date = new Date(data[i][1].$date);
    		console.log("Date : " + date);
    	}
    }

	});
	setTimeout(function(){updateData()}, 5000);
}


$.getJSON('http://127.0.0.1:5000/current', function(data) {

	var date = new Date(data[1].$date);

	console.log(date);
});