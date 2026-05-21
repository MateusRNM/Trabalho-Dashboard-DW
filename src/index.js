const canvasCreatedSolvedGraph = document.getElementById('graphCreatedSolved');

const fontConfig = {
    family: 'Poppins, sans-serif',
    weight: 400,
    size: 15
}

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