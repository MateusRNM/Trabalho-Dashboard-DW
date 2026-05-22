const canvasCreatedSolvedGraph = document.getElementById('graphCreatedSolved');
const canvasTicketsByTypeGraph = document.getElementById('graphTicketsByType');
const canvasNewTicketsReturnedTicketsGraph = document.getElementById('graphNewTicketsReturnedTickets');
const canvasFirstReplyAndFullResolveTime = document.getElementById('firstReplyAndFullResolveTime');
const canvasNumberOfTickets = document.getElementById('numberOfTickets');

const fontConfig = {
    family: 'Poppins, sans-serif',
    weight: 400,
    size: 15
}

const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: function(chart) {
        const { width, height, ctx } = chart;
        ctx.restore();
        ctx.font = "14px Poppins, sans-serif";
        ctx.fillStyle = "#8888a3";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Returned Tickets", width / 2, height / 2);
        ctx.fillText("1,200", width / 2, height / 2 + 15);
        ctx.save();
    }
};

const createdSolvedGraph = new Chart(canvasCreatedSolvedGraph, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
            label: 'Tickets Solved',
            data: [20, 52, 38, 42, 68, 55, 60],
            borderWidth: 2,
            borderColor: '#4bc0c0',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: '#4bc0c0'
        },
        {
            label: 'Tickets Created',
            data: [18, 44, 30, 35, 55, 45, 50],
            borderWidth: 2,
            borderColor: '#a872f2',
            tension: 0.4,
            borderDash: [5, 5],
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: '#a872f2'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        title: {
            display: true,
            text: 'Tickets Created vs Tickets Solved',
            align: 'start',
            color: '#fff',
            font: fontConfig,
        },
        legend: {
            position: 'top',
            align: 'start',
            rtl: true,
            labels: {
                usePointStyle: true,
                pointStyle: 'line',
                color: '#8888a3',
                boxWidth: 10
            }
        },
        tooltip: {
            enabled: true,
            backgroundColor: '#d470f3',
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
                label: function(context) {
                    return 'Max = ' + context.parsed.y + ' T';
                }
            }
        }
      },
      scales: {
            y: {
                min: 20,
                max: 90,
                grid: {
                    color: '#33334c',
                    drawBorder: false
                },
                ticks: { color: '#8888a3' }
            },
            x: {
                grid: {
                    color: '#33334c',
                    drawBorder: false,
                },
                ticks: { color: '#8888a3' }
            }
        }
    }
});

const ticketsByTypeGraph = new Chart(canvasTicketsByTypeGraph, {
    type: 'doughnut',
    data: {
      labels: ['Sales', 'Setup', 'Bug', 'Features'],
      datasets: [
        {
            data: [12, 25, 44, 19],
            backgroundColor: [
                '#04fdef',
                '#156f9c',
                '#0091ff',
                '#043bef'
            ],
            hoverOffset: 4
        }
      ]
    },
    plugins: [ChartDataLabels],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      borderWidth: 0,
      cutout: '65%',
      plugins: {
        title: {
            display: true,
            text: 'Tickets By Type',
            align: 'start',
            color: '#fff',
            font: fontConfig,
        },
        legend: {
            position: 'right',
            align: 'start',
            labels: {
                usePointStyle: true,
                color: '#fff'
            }
        },
        datalabels: {
            color: '#000',
            font: {
                ...fontConfig,
                size: 12
            },
            formatter: (value, context) => {
                const dataset = context.chart.data.datasets[0].data;
                const total = dataset.reduce((sum, item) => sum + item, 0);
                const percentage = (value / total * 100).toFixed(0);
                return percentage + '%';
            }
        }
      }
    }
});

const newTicketsReturnedTicketsGraph = new Chart(canvasNewTicketsReturnedTicketsGraph, {
    type: 'doughnut',
    data: {
        labels: ['Returned Tickets', 'New Tickets'],
        datasets: [{
            data: [62.8, 38.2],
            backgroundColor: [
                '#db12c3',
                '#b200fe'
            ],
            borderWidth: 0, 
            borderRadius: 20, 
            spacing: 5,
            cutout: '75%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'New Tickets vs Returned Tickets',
                align: 'start',
                color: '#fff',
                font: fontConfig,
            },
            legend: {
                display: false
            }
        }
    },
    plugins: [centerTextPlugin]
});

const ctxArea1 = canvasFirstReplyAndFullResolveTime.getContext('2d');

const gradientBlue = ctxArea1.createLinearGradient(0, 0, 0, 300);
gradientBlue.addColorStop(0, 'rgba(41, 168, 219, 0.8)');
gradientBlue.addColorStop(1, 'rgba(41, 168, 219, 0.05)');

const gradientPurple = ctxArea1.createLinearGradient(0, 0, 0, 300);
gradientPurple.addColorStop(0, 'rgba(159, 119, 243, 0.8)');
gradientPurple.addColorStop(1, 'rgba(41, 168, 219, 0.05)');

const firstReplyAndFullResolveTimeGraph = new Chart(canvasFirstReplyAndFullResolveTime, {
    type: 'line',
    data: {
        labels: ['01 Oct', '02 Oct', '03 Oct', '04 Oct', '05 Oct', '06 Oct', '07 Oct'],
        datasets: [
            {
                label: 'First Reply',
                data: [0.6, 0.4, 0.8, 1.2, 0.5, 0.5, 1],
                borderColor: '#29a8db',
                backgroundColor: gradientBlue, 
                borderWidth: 2,
                fill: true, 
                tension: 0.4, 
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#29a8db',
                pointHoverBorderColor: 'rgba(41, 168, 219, 0.4)',
                pointHoverBorderWidth: 10
            },
            {
                label: 'Full Resolve',
                data: [0.9, 1, 0.6, 0.4, 0.8, 0.5, 0.7],
                borderColor: '#9f77f3',
                backgroundColor: gradientPurple,
                borderWidth: 2,
                fill: true,
                tension: 0.7,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#9f77f3',
                pointHoverBorderColor: 'rgba(159, 119, 243, 0.4)',
                pointHoverBorderWidth: 10
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            title: {
                display: true,
                text: 'First Reply and Full Resolve Time',
                align: 'start',
                color: '#fff',
                font: fontConfig,
            },
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#29a8db',
                titleColor: 'rgba(255, 255, 255, 0.8)',
                titleFont: { ...fontConfig, size: 11, weight: 'normal' },
                bodyColor: '#fff',
                bodyFont: { ...fontConfig, size: 14, weight: 'bold' },
                padding: 12,
                displayColors: false,
                callbacks: {
                    title: function(context) {
                        return context[0].label;
                    },

                    label: function(context) {
                        return context.parsed.y + ' hours';
                    }
                }
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false,
                min: 0,
                max: 2
            }
        }
    }
});

const ctxArea2 = canvasNumberOfTickets.getContext('2d');
const gradientBlue2 = ctxArea1.createLinearGradient(0, 0, 0, 400);
gradientBlue2.addColorStop(0, 'rgba(36, 231, 227, 1)');
gradientBlue2.addColorStop(1, 'rgba(159, 119, 243, 1)');

const numberOfTicketsGraph = new Chart(canvasNumberOfTickets, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      datasets: [
        {
            label: 'Tickets Number',
            data: [60, 20, 70, 50, 90, 60],
            borderWidth: 2,
            backgroundColor: gradientBlue2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        title: {
            display: true,
            text: 'Number of Tickets / Week Day',
            align: 'start',
            color: '#fff',
            font: fontConfig,
        },
        legend: {
            display: false
        }
      },
      scales: {
            y: {
                min: 0,
                max: 100,
                grid: {
                    color: '#33334c',
                    drawBorder: false
                },
                ticks: { display: false }
            },
            x: {
                grid: {
                    color: '#33334c',
                    drawBorder: false,
                },
                ticks: { color: '#8888a3' }
            }
        }
    }
});