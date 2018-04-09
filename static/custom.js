
var depths = [];
var dates  = [];
var link = window.location.protocol+"//"+window.location.hostname;

if (window.location.port) {
    link += ":"+window.location.port;
}


function main(){

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Available Depth (cm)',
                data: depths,
                borderColor: 'rgba(83, 82, 237, 1)',
                backgroundColor: 'rgba(83, 82, 237, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 0
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 5,
                        max: 90
                    }
                }]
            },
        }
    });

}

function updateData(){
	$.getJSON(link+'/api/data', function(data) {
    //data is the JSON string
    
    if (data.length != parseInt($("#data").text())) {
    	$("#data").text(data.length);

        depths = [];
        dates = [];

        // console.log(data);
        var counter = 0;
    	for (var i in data){
    		// Depth in CM
    		depths.push(data[i][1]);

    		// Date
    		dates.push(data[i][2]);
            counter++;

            if (counter == 50){ 
                break;
            }
    	}
    }

    depths = depths.reverse();
    dates = dates.reverse();

    main();

	});
	setTimeout(function(){updateData()}, 5000);
}

updateData();

// $.getJSON('http://127.0.0.1:5000/api/current', function(data) {

// 	var date = new Date(data[3]);

// 	console.log(date);
// });

