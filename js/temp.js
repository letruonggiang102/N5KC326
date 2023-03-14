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
