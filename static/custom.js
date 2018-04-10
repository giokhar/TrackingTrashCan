
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

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

var depths = [];
var dates  = [];
var link = window.location.protocol+"//"+window.location.hostname;

if (window.location.port) {
    link += ":"+window.location.port;
}

function donut(pieData, filledColor) {
    var config = {
            type: 'doughnut',
            data: {
                labels: [
                  "Filled",
                  "Free"
                ],
                datasets: [{
                    data: pieData[0],
                    backgroundColor: [
                      // filledColor,
                      "#34495e",
                      filledColor
                    ],
                    hoverBackgroundColor: [
                      // filledColor,
                      "#34495e",
                      filledColor
                    ]
                }]
            },
        options: {
            animation: {
                duration: 0
            },
            elements: {
                center: {
                    text: pieData[1].toString()+"%",
          color: filledColor, // Default is #000000
          fontStyle: 'Arial', // Default is Arial
          sidePadding: 20 // Defualt is 20 (as a percentage)
                }
            }
        }
    };


var ctx_two = document.getElementById("Donut").getContext("2d");
var Donut = new Chart(ctx_two, config);

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

        var filledColor = "";
        // Donut chart'
        if ((70-data[0][1])/70 < 0.5){
            filledColor = "#27ae60";
        }
        else if (0.5 <= (70-data[0][1])/70 && (70-data[0][1])/70 < 0.75) {
            filledColor = "#f1c40f";
        }
        else {
            filledColor = "#e74c3c";
        }
        var perc = precisionRound((data[0][1])/70*100, 2);
        var pieData = [[70-data[0][1],data[0][1]], perc];
        donut(pieData, filledColor);

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

