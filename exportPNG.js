document.getElementById('exportPNGButton').addEventListener('click', function() {
	const svgElement = document.getElementById('svgOverlay').querySelector('svg');
	const serializer = new XMLSerializer();
	const svgStr = serializer.serializeToString(svgElement);
    
	imgWidth = 4096;
	imgHeight = 4096;
	const canvas = document.createElement('canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const ctx = canvas.getContext('2d');

    const svgBlob = new Blob([svgStr], {type: "image/svg+xml;charset=utf-8"});
    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);
    const svgImg = new Image();
	svgImg.onload = function () {
		ctx.drawImage(svgImg, 0, 0, imgWidth, imgHeight);
		const dataUrl = canvas.toDataURL('image/png');
		const link = document.createElement('a');
		link.download = 'Galactic Frontier.png';
		link.href = dataUrl;
		link.click();
		DOMURL.revokeObjectURL(url);
	};
	svgImg.src = url;
});