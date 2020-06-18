$(function(){

    function initMap(){
        let $map = $('#map'),
            state;
        $map.mapael({
            map:{
                name : "usa_states",
                fixedCenter: false,
                defaultArea : {
                    attrs: {
                        fill: '#FFF0D1',
                        stroke: Sing.colors['brand-warning'],
                    },
                    attrsHover: {
                        fill: '#feb04a',
                        animDuration : 100
                    },
                    tooltip: {
                        content: function(){
                            return '<strong>' + state + '</strong>';
                        }
                    },
                    eventHandlers: {
                        mouseover: function(e, id){
                            state = id;
                        }
                    }
                },
                defaultPlot:{
                    size: 17,
                    attrs : {
                        fill : Sing.colors['black'],
                        stroke : Sing.colors['white'],
                        "stroke-width" : 0,
                        "stroke-linejoin" : "round"
                    },
                    attrsHover : {
                        "stroke-width" : 1,
                        animDuration : 100
                    }
                },
                zoom : {
                    enabled: true,
                    mousewheel: true,
                    maxLevel: 10,
                    minLevel: 0,
                    step: 0.25
                }
            },
            plots:{
                'ny' : {
                    latitude: 40.717079,
                    longitude: -74.00116,
                    tooltip: {content : "New York"}
                },
                'on' : {
                    latitude: 33.145235,
                    longitude: -83.811834,
                    size: 18,
                    tooltip: {content : "Oconee National Forest"}
                },
                'sf' : {
                    latitude: 37.792032,
                    longitude: -122.394613,
                    size: 12,
                    tooltip: {content : "San Francisco"}
                },
                'la' : {
                    latitude: 26.935080,
                    longitude: -80.851766,
                    size: 26,
                    tooltip: {content : "Lake Okeechobee"}
                },
                'gc' : {
                    latitude: 36.331308,
                    longitude: -83.336050,
                    size: 10,
                    tooltip: {content : "Grainger County"}
                },
                'cc' : {
                    latitude: 36.269356,
                    longitude: -76.587477,
                    size: 22,
                    tooltip: {content : "Chowan County"}
                },
                'll' : {
                    latitude: 30.700644,
                    longitude: -95.145249,
                    tooltip: {content : "Lake Livingston"}
                },
                'tc' : {
                    latitude: 34.546708,
                    longitude: -90.211471,
                    size: 14,
                    tooltip: {content : "Tunica County"}
                },
                'lc' : {
                    latitude: 32.628599,
                    longitude: -103.675115,
                    tooltip: {content : "Lea County"}
                },
                'uc' : {
                    latitude: 40.456692,
                    longitude: -83.522688,
                    size: 11,
                    tooltip: {content : "Union County"}
                },
                'lm' : {
                    latitude: 33.844630,
                    longitude: -118.157483,
                    tooltip: {content : "Lakewood Mutual"}
                }
            }
        });
    }

    function apexChartFifth() {
        let options = {
            series: [{
                name: 'Users',
                type: 'area',
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'Sessions',
                type: 'line',
                data: [86, 96, 84, 62, 44, 52, 41]
            }],
            chart: {
                toolbar: {
                    show: false
                },
                height: 300,
            },
            grid: {
                padding: {
                    right: 20,
                    left: -10
                },
                xaxis: {
                    lines: {
                        show: false,
                    }
                }
            },
            colors: [Sing.colors['brand-warning'], Sing.colors['black']],
            fill: {
                colors: [ '#fff5e0' ]
            },
            stroke: {
                width: [4, 4],
                opacity: 0.5,
                colors: [Sing.colors['brand-warning'], Sing.colors['black']],
                curve: 'smooth'
            },

            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'
            ],
            legend: {
                position: 'top',
                horizontalAlign: 'center',
                markers: {
                    fillColors :[Sing.colors['brand-warning'], Sing.colors['black']]
                }
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: ['#898280','#898280','#898280','#898280','#898280'],
                        fontSize: '12px',
                    },
                    offsetX: -20,
                    offsetY: 0,
                },
                tickAmount: 4,
                padding: {
                    left: -20
                },
            },
            xaxis: {
                labels: {
                    style: {
                        colors: ['#898280','#898280','#898280','#898280','#898280','#898280','#898280'],
                        fontSize: '12px',
                    }
                }
            }
        };

        let chart = new ApexCharts(document.querySelector("#fifth-apex-chart"), options);
        chart.render();
    }

    function initAnimations(){
        $('#geo-locations-number, #percent-1, #percent-2, #percent-3').each(function(){
            $(this).animateNumber({
                number: $(this).text().replace(/ /gi, ''),
                numberStep: $.animateNumber.numberStepFactories.separator(' '),
                easing: 'easeInQuad'
            }, 1000);
        });
        $('.js-progress-animate').animateProgressBar();
    }

    function amcharts() {
        var chart = am4core.create("chartdiv", "PieChart");
    }

    function pjaxPageLoad(){
        $('.widget').widgster();
        initMap();
        apexChartFifth();
        initAnimations();
        amcharts();
    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

});
