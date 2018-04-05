

updateData();

function updateData(){
	$.getJSON('http://127.0.0.1:5000/data', function(data) {
    //data is the JSON string
    
    if (data.length != parseInt($("#data").text())) {
    	$("#data").text(data.length);
    }

	});
	setTimeout(function(){updateData()}, 5000);
}