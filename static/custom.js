
Chart.pluginService.register({
        beforeDraw: function (chart) {
            if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;
        
                //Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "30px " + fontStyle;
        
                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);

                //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;
        
        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
            }
        }
    });


        var config = {
            type: 'doughnut',
            data: {
                labels: [
                  "Red",
                  "Green",
                  "Yellow"
                ],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                    ]
                }]
            },
        options: {
            elements: {
                center: {
                    text: '90%',
          color: '#FF6384', // Default is #000000
          fontStyle: 'Arial', // Default is Arial
          sidePadding: 20 // Defualt is 20 (as a percentage)
                }
            }
        }
    };


var ctx_two = document.getElementById("Donut").getContext("2d");
var Donut = new Chart(ctx_two, config);

var depths = [];
var dates  = [];
var link = window.location.protocol+"//"+window.location.hostname;

if (window.location.port) {
    link += ":"+window.location.port;
}

function main(){

    var ctx_one = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx_one, {
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
                        max: 70
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
    	
        // Number of items
        $("#data").text(data.length);

        // Donut chart


        // Historical Data Chart
        depths = [];
        dates = [];
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
        depths = depths.reverse();
        dates = dates.reverse();
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

