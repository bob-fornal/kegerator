$(document).ready(() => {
	const kegPercentElement = $(".keg-percent");
	const submitElement = $(".submit");
	const percentElement = $(".percent");
	
	const kegNameElement = $("#keg-name");
	const kegPrimaryTitle = kegNameElement.find("#primary-text");
	const kegPrimaryWrapper = kegNameElement.find("#primary-wrapper");
	const kegSecondaryTitle = kegNameElement.find("#secondary-text");
	const kegSecondaryWrapper = kegNameElement.find("#secondary-wrapper");

	const colors = ['#ff9999', 'orange', 'green'];
	const textColors = ['black', 'black', 'white'];

	const setPrimaryTitle = (mainTitle, alternateTitle) => {
		kegPrimaryTitle.text(mainTitle);
		kegSecondaryTitle.text(alternateTitle);

		const primaryLength = kegNameElement.find("#primary-line")[0].getTotalLength() - 100;
		const primaryTextLength = kegPrimaryTitle[0].getBoundingClientRect().height;
		kegPrimaryWrapper.attr('transform', `translate(0, -${(primaryLength - primaryTextLength) / 2})`);

		const secondaryLength = kegNameElement.find("#secondary-line")[0].getTotalLength() - 100;
		const secondaryTextLength = kegSecondaryTitle[0].getBoundingClientRect().height;
		kegSecondaryWrapper.attr('transform', `translate(0, -${(secondaryLength - secondaryTextLength) / 2})`);
	};
	
	const setPercent = (percent) => {
		if (percent < 0.0 || percent > 1.0) return;
		percentElement.val(percent);
		
		const rangeMin = -0.91;
		const rangeMax = -0.078;
		const range = rangeMin - rangeMax;

		const countOfColors = colors.length;
		let colorToUse = 'white';
		let colorTextToUse = 'black';
		for (let i = 0, len = countOfColors; i < len; i++) {
			const colorMax = (i + 1)/countOfColors;
			console.log(percent, colorMax);
			if (percent <= colorMax) {
				colorToUse = colors[i];
				colorTextToUse = textColors[i];
				break;
			}
		}

		let calculatedPercent = ((range * (1 - percent)) + rangeMax) * 100;
		kegPercentElement.attr('style', `bottom: ${calculatedPercent}%;`);
		kegPercentElement.find('.actual-percent').attr('style', `fill: ${colorToUse};`);

		kegPrimaryWrapper.attr('style', `fill: ${colorTextToUse};`);
		kegSecondaryWrapper.attr('style', `fill: ${colorTextToUse};`);
	};

	submitElement.on('click', () => {
		const value = parseFloat(percentElement.val());
		if (value !== NaN) {
			setPercent(value);
		}
	});
	$(".0").on('click', () => setPercent(0.0));
	$(".10").on('click', () => setPercent(0.10));
	$(".20").on('click', () => setPercent(0.20));
	$(".30").on('click', () => setPercent(0.30));
	$(".40").on('click', () => setPercent(0.40));
	$(".50").on('click', () => setPercent(0.50));
	$(".60").on('click', () => setPercent(0.60));
	$(".70").on('click', () => setPercent(0.70));
	$(".80").on('click', () => setPercent(0.80));
	$(".90").on('click', () => setPercent(0.90));
	$(".100").on('click', () => setPercent(1.0));
	
	submitElement.click();
	setPrimaryTitle("Add Text Here", "and more ...");
});
