const canvasCreatedSolvedGraph = document.getElementById('graphCreatedSolved');
const canvasTicketsByTypeGraph = document.getElementById('graphTicketsByType');
const canvasNewTicketsReturnedTicketsGraph = document.getElementById('graphNewTicketsReturnedTickets');

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