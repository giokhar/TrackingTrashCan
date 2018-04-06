
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


var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
