window.addEventListener('resize', drawPoints);
document.addEventListener('DOMContentLoaded', drawPoints);

// Styling for the interactive points
const styleElement = document.createElement('style');
styleElement.textContent = `
.interactive-point { cursor: pointer; fill: blue; }
.interactive-point.selected { fill: red; }
`;
document.head.appendChild(styleElement);

function drawPoints() {
	const svgNS = 'http://www.w3.org/2000/svg';
	const svgOverlay = document.getElementById('svgOverlay');
	const numberOfRings = 10;
	const numberOfPointsPerRing = 24;
	const svgSize = svgOverlay.clientWidth; // Assumes svgOverlay div is square and its width is set via CSS

	svgOverlay.innerHTML = ''; // Clear any existing SVG content

	const svg = document.createElementNS(svgNS, 'svg');
	svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
	svgOverlay.appendChild(svg);

	// Draw the rings and their points
	for (let ringIndex = 0; ringIndex < numberOfRings; ringIndex++) {
		const radius = ((ringIndex + 1) / numberOfRings) * (svgSize / 2)*0.886;
		for (let pointIndex = 0; pointIndex < numberOfPointsPerRing; pointIndex++) {
			const angleDegrees = (pointIndex / numberOfPointsPerRing) * 360;
			const { x, y } = polarToCartesian(svgSize / 2, svgSize / 2, radius, angleDegrees);

			const circle = document.createElementNS(svgNS, 'circle');
			circle.setAttribute('cx', x);
			circle.setAttribute('cy', y);
			circle.setAttribute('r', 6); // Size of clickable points
			circle.setAttribute('fill', 'blue');
			circle.setAttribute('class', 'interactive-point');
			circle.setAttribute('data-ring-index', ringIndex);
			circle.setAttribute('data-point-index', pointIndex);
			circle.addEventListener('click', handlePointClick);
			svg.appendChild(circle);
		}
	}
}

let selectedPoints = [];

function handlePointClick(event) {
	const circle = event.target;
	const ringIndex = parseInt(circle.getAttribute('data-ring-index'));
	const pointIndex = parseInt(circle.getAttribute('data-point-index'));
	const isSelected = circle.classList.contains('selected');

	if (isSelected) {
		selectedPoints = selectedPoints.filter(p => p[0] !== ringIndex || p[1] !== pointIndex);
	} else {
		selectedPoints.push([ringIndex, pointIndex]);
	}

	circle.classList.toggle('selected');

	// Output the array of selected points as a JSON object
	console.clear();
	console.log(JSON.stringify(selectedPoints, null));
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}