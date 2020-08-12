$(function(){
    let colors = {
        'black': '#323232',
        'brand-primary': '#1f7db6',
        'brand-success': '#3BBF97',
        'brand-danger': '#F5695A',
        'brand-warning': '#feb04a',
        'brand-info': '#12b4de',
        'brand-new-warning': '#FFA983'
    };
    let mainOptions  = {
        chartFirst: {
            themeFirst: {
                colors: ['RGBA(254, 176, 74, 0.3)']
            },
            themeSecond: {
                colors: ['RGBA(255,169,131, 0.3)']
            },
            themeThird: {
                colors: [colors["brand-new-warning"]]
            },
            themeFourth: {
                colors: ['RGBA(245,105,90, 0.3)']
            }
        },
        chartSecond: {
            themeFirst: {
                colors: ['RGBA(224, 85, 70, 0.3)']
            },
            themeSecond: {
                colors: ['RGBA(50, 50, 50, 0.3)']
            },
            themeThird: {
                colors: ['RGBA(50, 50, 50, 0.3)']
            },
            themeFourth: {
                colors: ['RGBA(50, 50, 50, 0.3)']
            }
        },
        chartThird: {
            themeFirst: {
                stroke: {
                    colors: [colors['brand-danger']]
                },
                colors: [colors['brand-danger']],
                fill: {
                    colors: [colors["brand-danger"]]
                }
            },
            themeSecond: {
                stroke: {
                    colors: ['RGBA(50,50,50, 0.8)'],
                },
                colors: ['#323232'],
                fill: {
                    colors: ['#323232']
                }
            },
            themeThird: {
                colors: ['RGBA(50, 50, 50, 0.8)'],
                stroke: {
                    colors: ['RGBA(50, 50, 50, 0.8)']
                },
                fill: {
                    colors: ['#323232']
                }
            },
            themeFourth: {
                colors: ['RGBA(50, 50, 50, 0.8)'],
                stroke: {
                    colors: ['RGBA(50, 50, 50, 0.8)']
                },
                fill: {
                    type: 'solid',
                    opacity: 0.1,
                    colors: ['#323232']
                }
            }
        },
        chartFourth: {
            themeFirst: {
                colors: [colors["brand-warning"]],
                fill: {
                    colors: [colors["brand-warning"]]
                },
                stroke: {
                    colors: [colors['brand-warning']]
                }
            },
            themeSecond: {
                fill: {
                    colors: [colors["brand-new-warning"]]
                },
                colors: [colors['brand-new-warning']],
                stroke: {
                    colors: [colors['brand-new-warning']]
                }
            },
            themeThird: {
                colors: [colors["brand-new-warning"]],
                fill: {
                    colors: [colors["brand-new-warning"]]
                },
                stroke: {
                    colors: [colors["brand-new-warning"]]
                }
            },
            themeFourth: {
                colors: [colors["brand-danger"]],
                fill: {
                    colors: [colors["brand-danger"]]
                },
                stroke: {
                    colors: [colors['brand-danger']]
                }
            }
        },
        chartFifth: {
            themeFirst: {
                colors: [colors['brand-warning'], colors['black']],
                fill: {
                    colors: ['RGBA(255, 173, 1, 0.1)']
                },
                legend: {
                    markers: {
                        fillColors :[colors['brand-warning'], colors['black']]
                    }
                }
            },
            themeSecond: {
                colors: [colors['brand-danger'], colors['black']],
                fill: {
                    colors: ['RGBA(224, 85, 70, 0.1)']
                },
                legend: {
                    markers: {
                        fillColors :[colors['brand-danger'], colors['black']]
                    }
                }
            },
            themeThird: {
                colors: [colors['brand-success'], colors['black']],
                fill: {
                    colors: ['RGBA(56, 163, 131, 0.1)']
                },
                legend: {
                    markers: {
                        fillColors :[colors['brand-success'], colors['black']]
                    }
                }
            },
            themeFourth: {
                colors: [colors['brand-info'], colors['black']],
                fill: {
                    colors: ['RGBA(18, 180, 222, 0.1)']
                },
                legend: {
                    markers: {
                        fillColors :[colors['brand-info'], colors['black']]
                    }
                }
            }
        },
        chartSixth: {
            themeFirst: {
                colors: [colors['brand-warning'], colors['brand-danger'], colors['black']]
            },
            themeSecond: {
                colors: [colors['brand-danger'], colors['brand-new-warning'], colors['black']]
            },
            themeThird: {
                colors: [colors['brand-success'], colors['brand-new-warning'], colors['black']]
            },
            themeFourth: {
                colors: [colors['brand-info'], colors['brand-danger'], colors['black']]
            }
        }
    };

    function colorsUpdate(chartName, theme, chartType) {
        $('.colors-list .color-box').click(function(e) {
            const target = $(e.target);
            const style = target.data('style')
            let options = {}

            if (chartType === 'bars')
            {
                options =
                    style === 'first' ? theme.themeFirst :
                    style === 'second' ? theme.themeSecond :
                    style === 'third' ? theme.themeThird : theme.themeFourth
                }
            else if (chartType === 'two-lines')
            {
                options =
                    style === 'first' ? theme.themeFirst :
                    style === 'second' ? theme.themeSecond :
                    style === 'third' ? theme.themeThird : theme.themeFourth
                }
            else if (chartType === 'lines')
            {
                options =
                    style === 'first' ? theme.themeFirst :
                    style === 'second' ? theme.themeSecond :
                    style === 'third' ? theme.themeThird : theme.themeFourth
            }
            else if (chartType === 'pie')
            {
                options =
                    style === 'first' ? theme.themeFirst :
                    style === 'second' ? theme.themeSecond:
                    style === 'third' ? theme.themeThird : theme.themeFourth
            }

            chartName.updateOptions( options );
        });
    }

    function apexChartFirst() {
        let options = {
            chart: {
                id: 'chartFirst',
                height: 90,
                type: 'bar',
                toolbar: {
                    show: false
                },
            },
            series: [{
                data: [70, 63, 84, 79, 70, 65, 80, 70, 68, 86, 81, 88, 60]
            }],
            colors: ['RGBA(255, 173, 1, 0.3)'],
            plotOptions: {
                bar: {
                    columnWidth: "45%",
                    distributed: true,
                    endingShape: "rounded",
                    startingShape: "rounded",
                },
            },
            grid: {
                padding: {
                    left: -20,
                    right: 0,
                },
                margin: {
                    bottom: 0
                },
                xaxis: {
                    lines: {
                        show: false,
                    }
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                }
            },
            dataLabels: {
                enabled: false,
                dropShadow: {
                    enable: false
                }
            },
            legend: {
                show: false
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                }
            },
            yaxis: {
                labels: {
                    show: false
                }
            }
        };

        let chart = new ApexCharts(document.querySelector("#first-apex-chart"), options);

        chart.render();

        colorsUpdate(chart, mainOptions.chartFirst, 'bars');
    }

    function apexChartSecond() {
        let options = {
            series: [{
                data: [210, 220, 220, 280, 260, 210, 230, 300, 280, 260, 210, 230, 300]
            }],
            chart: {
                id: 'chartSecond',
                width: '100%',
                toolbar: {
                    show: false
                },
                height: 90,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    columnWidth: "40%",
                    distributed: true,
                    endingShape: "rounded",
                    startingShape: "rounded",
                },
            },
            grid: {
                padding: {
                    left: -20,
                    right: 0
                },
                xaxis: {
                    lines: {
                        show: false,
                    }
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                }
            },
            colors: ['RGBA(246, 121, 93, 0.3)'],

            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                }
            },
            yaxis: {
                labels: {
                    show: false
                }
            }
        };

        let chart = new ApexCharts(document.querySelector("#second-apex-chart"), options);
        chart.render();

        colorsUpdate(chart, mainOptions.chartSecond, 'bars');

    }

    function apexChartThird() {
        let options = {
            series: [{
                data: [55, 56, 52, 51, 52, 55, 53]
            }],
            chart: {
                id: 'chartThird',
                width: '100%',
                toolbar: {
                    show: false
                },
                height: 90,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                padding: {
                    left: -20,
                    right: 0
                },
                xaxis: {
                    lines: {
                        show: false,
                    }
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                }
            },
            colors: [colors["brand-danger"]],
            fill: {
                type: 'solid',
                opacity: 0.1,
                colors: [colors["brand-danger"]]
            },
            stroke: {
                colors: [colors['brand-danger']],
                curve: 'smooth'
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                }
            },
            yaxis: {
                labels: {
                    show: false
                }
            }
        };

        let chart = new ApexCharts(document.querySelector("#third-apex-chard"), options);
        chart.render();

        colorsUpdate(chart, mainOptions.chartThird, 'lines');

    }

    function apexChartFourth() {
        let options = {
            series: [{
                data: [56, 42, 55, 42, 64, 52, 65]
            }],
            chart: {
                id: 'chartFourth',
                width: '100%',
                toolbar: {
                    show: false
                },
                height: 90,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                padding: {
                    left: -20,
                    right: 0
                },
                xaxis: {
                    lines: {
                        show: false,
                    }
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                }
            },
            colors: [colors["brand-warning"]],
            fill: {
                type: 'solid',
                opacity: 0.1,
                colors: [colors["brand-warning"]],

            },
            stroke: {
                colors: [colors['brand-warning']],
                curve: 'smooth'
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                }
            },
            yaxis: {
                labels: {
                    show: false
                }
            }
        };

        let chart = new ApexCharts(document.querySelector("#fourth-apex-chart"), options);
        chart.render();

        colorsUpdate(chart, mainOptions.chartFourth, 'lines');
    }

    function apexChartFifth() {
        let options = {
            series: [{
                name: 'Income',
                type: 'area',
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'Outcome',
                type: 'line',
                data: [86, 96, 84, 62, 44, 52, 41]
            }],
            chart: {
                id: 'chartFifth',
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
            colors: [colors['brand-warning'], colors['black']],
            fill: {
                colors: ['RGBA(255, 173, 1, 0.1)']
            },
            stroke: {
                width: [4, 4],
                opacity: 0.5,
                curve: 'smooth'
            },

            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
            legend: {
                position: 'top',
                horizontalAlign: 'center',
                markers: {
                    fillColors :[colors['brand-warning'], colors['black']]
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

        colorsUpdate(chart, mainOptions.chartFifth, 'two-lines');
    }

    function apexChartSixth() {
        let options = {
            series: [1732, 253, 154],
            chart: {
                id: 'chartSixth',
                type: 'donut',
                height: 180,
                width: '100%'
            },
            colors: [colors['brand-warning'], colors['brand-danger'], colors['black']],
            plotOptions: {
                pie: {
                    donut: {
                        size: '50%',
                    },
                }
            },
            dataLabels: {
                dropShadow: {
                    enabled: false
                }
            },
            stroke: {
                width: 0
            },
            legend: {
                show: false
            }
        };

        let chart = new ApexCharts(document.querySelector("#sixth-apex-chard"), options);
        chart.render();

        colorsUpdate(chart, mainOptions.chartSixth, 'pie');
    }

    function chartsThemeLoad() {

        const charts = ['chartFirst', 'chartSecond', 'chartThird', 'chartFourth', 'chartFifth', 'chartSixth'];
        if (localStorage.getItem('sidebarTheme')) {
            if (localStorage.getItem('sidebarTheme').indexOf('theme-second') !== -1) {
                for ( let i = 0; i < 6; i++ ) {
                    ApexCharts.exec(charts[i], 'updateOptions', mainOptions[ charts[i] ].themeSecond);
                }
            }
            else if (localStorage.getItem('sidebarTheme').indexOf('theme-third') !== -1) {
                for ( let i = 0; i < 6; i++ ) {
                    ApexCharts.exec(charts[i], 'updateOptions', mainOptions[ charts[i] ].themeThird);
                }
            }
            else if (localStorage.getItem('sidebarTheme').indexOf('theme-fourth') !== -1) {
                for ( let i = 0; i < 6; i++ ) {
                    ApexCharts.exec(charts[i], 'updateOptions', mainOptions[ charts[i] ].themeFourth);
                }
            }
        }
    }

    function setDateToDropDown() {
        let button = $('#dropdownMenu');
        button.text(moment().format("Do MMM YYYY"));
        $('.dashboard-buttons .dropdown .dropdown-item').each(
            function(i, elem) {
                $(elem).text(moment().add(i + 1, 'd').format("Do MMM YYYY"))
            }
        )
    }

    function pageLoad(){
        $('.widget').widgster();
        apexChartFirst();
        apexChartSecond();
        apexChartThird();
        apexChartFourth();
        apexChartFifth();
        apexChartSixth();
        chartsThemeLoad();
        setDateToDropDown();
    }

    pageLoad();
    SingApp.onPageLoad(pageLoad);
});
