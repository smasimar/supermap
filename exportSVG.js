document.getElementById('exportSVGButton').addEventListener('click', function() {
	exportSVG();
});

function exportSVG() {
	const svgElement = document.getElementById('svgOverlay').querySelector('svg');
	svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	const serializer = new XMLSerializer();
	let svgContent = serializer.serializeToString(svgElement);
	
	const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = 'Galactic Frontier.svg';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}