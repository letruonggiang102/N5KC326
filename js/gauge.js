var delay = 2000,
    value = 0,
    valueStore = 0,
    tick = 1,
    tickStore = 1,
    tickDiff = 0,
    tickDiffValue = 0;

function valBetween(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
}

(function loop() {

    tick = valBetween(Math.ceil((value / 100) * 28), 1, 28);
    tickDiff = Math.abs(tick - tickStore);
    tickDiffValue = Math.abs(value - valueStore) / tickDiff;

    var counter = 0,
        valueStoreTemp = valueStore,
        tickStoreTemp = tickStore;
    if (value > valueStore) {
        for (i = tickStoreTemp; i <= tick; i++) {
            (function(i) {
                setTimeout(function() {

                    $('#gauge path:nth-child(' + i + ')').show();
                    $('#gauge-label')
                        .css('color', $('#gauge path:nth-child(' + i + ')')[0].style.fill)
                        .text(Math.ceil(valueStoreTemp + (tickDiffValue * Math.abs(tickStoreTemp - i))));
                    if (i == tick) { $('#gauge-label').text(value); }

                }, 50 * counter);
                counter++;
            }(i));
        }
    } else if (value < valueStore) {
        for (i = tickStoreTemp; i >= tick; i--) {
            (function(i) {
                setTimeout(function() {

                    $('#gauge path:nth-child(' + i + ')').hide();
                    $('#gauge-label')
                        .css('color', $('#gauge path:nth-child(' + i + ')')[0].style.fill)
                        .text(Math.floor(valueStoreTemp - (tickDiffValue * Math.abs(tickStoreTemp - i))));
                    if (i == tick) {
                        $('#gauge-label').text(value);
                    }

                }, 50 * counter);
                counter++;
            }(i));
        }
    }
    valueStore = value;
    tickStore = tick;
    window.setTimeout(loop, delay);
})();

// SLIDER BAR NEW

var elem = document.querySelector('input[type="range"]');

var rangeValue = function() {
    var newValue = elem.value;
    var target = document.querySelector('.value');
    target.innerHTML = newValue;
}

elem.addEventListener("input", rangeValue);


var key = '125f4cc010f1946e4a1aadd67a75486fb';

// hàm lấy giá trị ppm từ server
let gasId = 1;

function fetchPpm() {

    const url = `https://mqtt.tranquang.net/api/messages/topics/${gasId}?token=${key}&page=1&limit=1&order=DESC`;

    console.log(gasId);

    // hàm lấy giá trị ppm từ server
    $.get(url, function(response) {

        // giá trị ppm

        var message = response.data.messages[0];
        var ppm = message.payload;

        // ghi vào biến 'value', chính là biến chứa giá trị của gauge
        value = parseFloat(ppm)

    })
}

setInterval(fetchPpm, 1000);

// class input của slider
const slider = '.slider';



function fetchAlarm() {


    var topicId = 3;
    const url = `https://mqtt.tranquang.net/api/topics/retain/${topicId}?token=${key}`;


    $.get(url, function(response) {

        var message = response.data;
        var alarm = message.payload;

        var target = document.querySelector('.value');
        elem.value = alarm
        target.innerHTML = alarm;

    })
}
fetchAlarm();


// hàm bắt sự kiện khi thay đổi giá trị slider
$(slider).change(function(data) {

    // giá trị thay đổi
    const sliderValue = data.target.value;

    const topicId = 3;
    const url = `https://mqtt.tranquang.net/api/topics/publish/${topicId}?token=${key}&payload=${sliderValue}&payload_encoding=plain&qos=0&retain=true`;

    // hàm gửi dữ liệu lên server
    $.get(url, function(data) {})

})

document.addEventListener("station", e => {
    const station = e.detail;

    switch (station) {
        case "station1":
            gasId = 1;
            break;
        case "station2":
            gasId = 9;
            break;
    }
})