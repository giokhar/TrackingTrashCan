
var depths = [];
var dates  = [];

updateData();

function updateData(){
	$.getJSON('http://127.0.0.1:5000/api/data', function(data) {
    //data is the JSON string
    
    if (data.length != parseInt($("#data").text())) {
    	$("#data").text(data.length);

    	for(var i=0; i<data.length; i++){
    		// Depth in CM
    		depths[i] = data[i][0];

    		// Date
            var date = new Date(data[i][1].$date)
    		dates[i] = date;
    	}
    }

	});
	setTimeout(function(){updateData()}, 5000);
}

console.log(depths);
console.log(dates);

$.getJSON('http://127.0.0.1:5000/api/current', function(data) {

	var date = new Date(data[1].$date);

	console.log(date);
});