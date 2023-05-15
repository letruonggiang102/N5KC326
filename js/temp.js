const memberUrl = '/member.html';

const linkDom = '.logo';
const largeGearDom = '.large-gear';

const satelliteGearTop = '.bgleft-gear-top img';
const satelliteGearLeft = '.bgleft-gear-left img';
const satelliteGearBottom = '.bgleft-gear-bot img';
const satelliteGearRight = '.bgleft-gear-right img';

const clickAnimationTime = 2000;

// when user mouse over link
$(linkDom).mouseover(e => {
	$(largeGearDom).addClass('when-link-over');
})

// when user mout out link
$(linkDom).mouseout(e => {
	$(largeGearDom).removeClass('when-link-over');
})

$(linkDom).click(e => {

	$(satelliteGearTop).addClass('top-gear-when-link-clicked');

	$(satelliteGearLeft).addClass('left-gear-when-link-clicked');

	$(satelliteGearBottom).addClass('bot-gear-when-link-clicked');

	$(satelliteGearRight).addClass('right-gear-when-link-clicked');

	setTimeout(() => {
		location.href = memberUrl
	}, clickAnimationTime);
})






const token = '125f4cc010f1946e4a1aadd67a75486fb';

let connectTopicId = 2;
const ledConnectClass = ".led-connect";
const ledConnectClassToAdd = "led-green"

let alarmTopicId = 7;
const ledAlarmClass = ".led-alarm";
const ledAlarmClassToAdd = "led-red"

function fetchConnectLed() {
	const url = `https://mqtt.tranquang.net/api/topics/retain/${connectTopicId}?token=${token}`

	$.get(url, function(response) {

		const message = response.data;
		const connect = parseInt(message.payload);

		if (connect) {
			$(ledConnectClass).addClass(ledConnectClassToAdd);
		} else {
			$(ledConnectClass).removeClass(ledConnectClassToAdd);
		}
	})
}


function fetchAlarmLed() {
	const url = `https://mqtt.tranquang.net/api/topics/retain/${alarmTopicId}?token=${token}`

	$.get(url, function(response) {

		const message = response.data;
		const alarm = parseInt(message.payload);

		if (alarm == 1) {
			$(ledAlarmClass).addClass(ledAlarmClassToAdd);
		} else {
			$(ledAlarmClass).removeClass(ledAlarmClassToAdd);
		}
	})
}

setInterval(fetchAlarmLed, 500);
setInterval(fetchConnectLed, 500);

$("#stations").on("change", (e) => {
	const selected = e.target.value;
	switch (selected) {
		case "Station 1":
			document.dispatchEvent(new CustomEvent("station", { detail: "station1" }));
			break;
		case "Station 2":
			document.dispatchEvent(new CustomEvent("station", { detail: "station2" }));
			break;
	}
});

document.addEventListener("station", e => {
	const station = e.detail;

	switch (station) {
		case "station1":
			connectTopicId = 2;
			alarmTopicId = 7;
			break;
		case "station2":
			connectTopicId = 8;
			alarmTopicId = 10;
			break;
	}
})