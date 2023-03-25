new Chart(document.getElementById("chartjs-0"), {
    type: "line",
    data: {
      labels: [
        "11-24 13:05",
        "11-24 19:05",
        "11-24 22:05",
        "11-25 10:05",
        "11-25 14:05",
        "11-25 19:05",
        "11-25 23:05",
        "11-26 10:05",
        "11-26 13:05",
        "11-26 18:05",
        "11-26 22:05"
      ],
      datasets: [
        {
          label: "Views",
          data: [129, 281, 470, 705, 843, 979, 1106, 1240, 1396, 1553, 1860],
          fill: true,
          borderColor: "#fffcdc",
          lineTension: 0.4,
          pointBorderColor: "blue",
          spanGaps: true
        }
      ]
    },
    options: {
      legend: {
        labels: {
          fontColor: "white",
          fontSize: 16
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "white"
            },
            gridLines: {
              display: true,
              color: "#ffc3a0"
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "white"
            },
            gridLines: {
              display: true,
              color: "#ffc3a0"
            }
          }
        ]
      }
    }
  });
  