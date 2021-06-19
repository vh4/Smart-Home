const database = firebase.database()
var temperature = 0;
var pressure = 0;
var hummy = 0;

function check() {
    document.getElementById("kamar_tidur").checked = true;
  }
  
  function uncheck() {
    document.getElementById("kamar_tidur").checked = false;
  }

  function check_ruangan() {
    document.getElementById("ruangan").checked = true;
  }
  
  function uncheck_ruangan() {
    document.getElementById("ruangan").checked = false;
  }
  
  function check_kmr_mandi() {
    document.getElementById("kamar_mandi").checked = true;
  }
  
  function uncheck_kmr_mandi() {
    document.getElementById("kamar_mandi").checked = false;
  }
  

  function selesai() {
	setTimeout(function() {
		datarealtime();
		selesai();
	}, 10);
}


setInterval(() => {
  database.ref('/data').orderByValue().on('value', snapshot =>{
    $( "#tem" ).html(snapshot.val()['-McO7hjK6I3eTMZSDpm_'].suhu);
    $( "#hum" ).html(snapshot.val()['-McO7hjK6I3eTMZSDpm_'].kelembapan);
    $( "#pre" ).html(snapshot.val()['-McO7hjK6I3eTMZSDpm_'].tekanan);

     temperature = snapshot.val()['-McO7hjK6I3eTMZSDpm_'].suhu
     pressure = snapshot.val()['-McO7hjK6I3eTMZSDpm_'].kelembapan;
     hummy = snapshot.val()['-McO7hjK6I3eTMZSDpm_'].tekanan;

      })
}, 100);

 
 function datarealtime(){

    database.ref('/lampu').orderByValue().on('value', snapshot =>{
        if(snapshot.val().McODqNHeG7WpUqjmop8.lampu_kamar == 'ON'){
            check()
        }
        else if(snapshot.val().McODqNHeG7WpUqjmop8.lampu_kamar == 'OFF'){
            uncheck()
        }
        if(snapshot.val().McODqNHeG7WpUqjmop8.lampu_ruangan == 'ON'){
            check_ruangan()
        }
        else if(snapshot.val().McODqNHeG7WpUqjmop8.lampu_ruangan == 'OFF'){
            uncheck_ruangan()
        }
        if(snapshot.val().McODqNHeG7WpUqjmop8.lampu_kamar_mandi == 'ON'){
            check_kmr_mandi()
        }
        else if(snapshot.val().McODqNHeG7WpUqjmop8.lampu_kamar_mandi == 'OFF'){
            uncheck_kmr_mandi()
        }
    })
 }
 selesai()
 

$(function(){

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    
    Highcharts.stockChart('grafiktemperature', {
        chart: {
            events: {
                load: function () {
    
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = temperature;
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
    
        time: {
            useUTC: false
        },
    
        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
    
        title: {
            text: 'Live data suhu'
        },
    
        exporting: {
            enabled: false
        },
    
        series: [{
            name: 'Live data suhu',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
    
                for (i = -999; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        temperature
                    ]);
                }
                return data;
            }())
        }]
    });
          

});




$(function(){

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    
    Highcharts.chart('grafikpressure', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
    
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = pressure;
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Live data tekanan'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'nilai tekanan'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Live data tekanan',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
    
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: pressure
                    });
                }
                return data;
            }())
        }]
    });

});




$(function(){

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    
    Highcharts.chart('hummygrafik', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
    
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = hummy;
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Live data Kelembapan'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'nilai kelembapan'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'live data kelembapan',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
    
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: hummy
                    });
                }
                return data;
            }())
        }]
    });

});



$(function() {
    Highcharts.setOptions({
	    global: {
	        useUTC: false
	    }
    });
    
    const map = new google.maps.Map(document.getElementById("coordinate"), {
      center: { lat: -7.5663978, lng: 110.8738406 },
      zoom: 16,
      mapTypeId: "terrain",
    });
    const map_marker = new google.maps.Marker({position: {lat: param.getLintang(), lng: param.getBujur()}, map: map, icon: image});
    map_marker.setMap(map);

  
}); 

    


