
var depths = [];
var dates  = [];

function main(){

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: '# of Votes',
                data: depths,
                borderColor: 'rgba(255,99,132,1)',
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

}

function updateData(){
	$.getJSON('http://127.0.0.1:5000/api/data', function(data) {
    //data is the JSON string
    
    if (data.length != parseInt($("#data").text())) {
    	$("#data").text(data.length);

        // console.log(data);
    	for (var i in data){
    		// Depth in CM
    		depths.push(data[i][1]);

    		// Date
    		dates.push(data[i][2]);
    	}
    }
    main();
	});
	setTimeout(function(){updateData()}, 5000);
}

updateData();

// $.getJSON('http://127.0.0.1:5000/api/current', function(data) {

// 	var date = new Date(data[3]);

// 	console.log(date);
// });

