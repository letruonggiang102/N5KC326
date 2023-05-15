let chart = new Chart(document.getElementById("chartjs-0"), {
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
        datasets: [{
            label: "Views",
            data: [129, 281, 470, 705, 843, 979, 1106, 1240, 1396, 1553, 1860],
            fill: true,
            borderColor: "#fffcdc",
            lineTension: 0.4,
            pointBorderColor: "blue",
            spanGaps: true
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: "white",
                fontSize: 16
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white"
                },
                gridLines: {
                    display: true,
                    color: "#ffc3a0"
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white"
                },
                gridLines: {
                    display: true,
                    color: "#ffc3a0"
                }
            }]
        }
    }
});

const apiKey = '125f4cc010f1946e4a1aadd67a75486fb';
let gasTopicId = 1;

let chartUpdate = () => {

    const url = `https://mqtt.tranquang.net/api/messages/topics/${gasTopicId}?token=${apiKey}&page=1&limit=11&order=DESC`;

    $.get(url, (response) => {

        chart.data.labels = [];
        chart.data.datasets[0].data = [];

        const messages = response.data.messages;

        for (let i = messages.length - 1; i >= 0; i--) {
            const message = messages[i];

            const formatedDateString = formatDate(message.publish_at);
            chart.data.labels.push(formatedDateString);
            chart.data.datasets[0].data.push(parseFloat(message.payload));
        }

        chart.update();

    });
}

setInterval(chartUpdate, 500);






const formatDate = (isoDateString) => {

    // Create a Date object from the ISO 8601 date string
    const date = new Date(isoDateString);

    // Format the date string in the "MM-dd hh:mm" format
    const formattedDateString = date.toLocaleString('vi-VN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '');


    return formattedDateString;
}



$("#stations").on("change", (e) => {
    const selected = e.target.value;
    switch (selected) {
        case "Station 1":
            gasTopicId = 1;
            break;
        case "Station 2":
            gasTopicId = 9;
            break;
    }
});