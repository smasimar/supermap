window.addEventListener('resize', drawDefinedShapes);
document.addEventListener('DOMContentLoaded', drawDefinedShapes);

const groups = {
	'Super Earth': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],[0,17],[0,18],[0,19],[0,20],[0,21],[0,22],[0,23],[0,0]],
	'Akira Sector': [[4,12],[5,12],[5,13],[7,13],[7,14],[4,14],[4,13],[4,12]],
	'Alstrad Sector': [[5,15],[6,15],[6,16],[6,17],[5,17],[5,16],[5,15]],
	'Altus Sector': [[0,0],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[0,6],[0,5],[0,4],[0,3],[0,2],[0,1],[0,0]],
	'Andromeda Sector': [[4,20],[5,20],[5,19],[6,19],[6,20],[6,21],[4,21],[4,20]],
	'Arturion Sector': [[4,0],[5,0],[5,1],[6,1],[6,0],[7,0],[7,1],[7,2],[4,2],[4,1],[4,0]],
	'Barnard Sector': [[0,6],[1,6],[1,7],[2,7],[2,8],[2,9],[1,9],[1,10],[1,11],[0,11],[0,10],[0,9],[0,8],[0,7],[0,6]],
	'Borgus Sector': [[4,6],[6,6],[6,7],[4,7],[4,6]],
	'Cancri Sector': [[0,11],[1,11],[1,10],[1,9],[2,9],[2,10],[2,11],[2,12],[2,13],[0,13],[0,12],[0,11]],
	'Cantolus Sector': [[0,14],[1,14],[1,15],[2,15],[2,16],[2,17],[1,17],[1,18],[0,18],[0,17],[0,16],[0,15],[0,14]],
	'Celeste Sector': [[1,2],[2,2],[2,3],[2,4],[3,4],[3,5],[3,6],[1,6],[1,5],[1,4],[1,3],[1,2]],
	'Draco Sector': [[5,4],[7,4],[7,5],[5,5],[5,4]],
	'Falstaff Sector': [[4,2],[7,2],[7,3],[4,3],[4,2]],
	'Farsight Sector': [[6,7],[9,7],[9,8],[9,9],[7,9],[7,8],[6,8],[6,7]],
	'Ferris Sector': [[5,8],[6,8],[6,9],[6,10],[6,11],[5,11],[5,10],[5,9],[5,8]],
	'Gallux Sector': [[2,8],[5,8],[5,9],[5,10],[4,10],[4,9],[2,9],[2,8]],
	'Gellert Sector': [[7,23],[8,23],[8,22],[9,22],[9,23],[9,0],[8,0],[8,1],[7,1],[7,0],[7,23]],
	'Gothmar Sector': [[0,13],[2,13],[2,14],[2,15],[1,15],[1,14],[0,14],[0,13]],
	'Guang Sector': [[3,14],[6,14],[6,15],[3,15],[3,14]],
	'Hanzo Sector': [[4,10],[5,10],[5,11],[6,11],[6,12],[4,12],[4,11],[4,10]],
	'Hawking Sector': [[7,1],[8,1],[8,0],[9,0],[9,1],[9,2],[7,2],[7,1]],
	'Hydra Sector': [[3,20],[4,20],[4,21],[5,21],[5,22],[3,22],[3,21],[3,20]],
	'Idun Sector': [[0,18],[1,18],[1,17],[3,17],[3,18],[2,18],[2,19],[0,19],[0,18]],
	'Iptus Sector': [[1,0],[4,0],[4,1],[4,2],[1,2],[1,1],[1,0]],
	'Jin Xi Sector': [[5,5],[7,5],[7,6],[8,6],[8,7],[6,7],[6,6],[5,6],[5,5]],
	'Kelvin Sector': [[0,19],[2,19],[2,20],[1,20],[1,21],[1,22],[1,23],[1,0],[0,0],[0,23],[0,22],[0,21],[0,20],[0,19]],
	'Korpus Sector': [[1,6],[4,6],[4,7],[3,7],[3,8],[2,8],[2,7],[1,7],[1,6]],
	'L\'estrade Sector': [[7,2],[9,2],[9,3],[9,4],[8,4],[8,5],[7,5],[7,4],[7,3],[7,2]],
	'Lacaille Sector': [[5,21],[6,21],[6,22],[6,23],[4,23],[4,22],[5,22],[5,21]],
	'Leo Sector': [[6,8],[7,8],[7,9],[9,9],[9,10],[6,10],[6,9],[6,8]],
	'Marspira Sector': [[1,20],[3,20],[3,21],[3,22],[3,23],[2,23],[2,22],[1,22],[1,21],[1,20]],
	'Meridian Sector': [[2,15],[3,15],[3,16],[4,16],[4,17],[2,17],[2,16],[2,15]],
	'Mirin Sector': [[5,3],[7,3],[7,4],[5,4],[5,3]],
	'Morgon Sector': [[2,9],[4,9],[4,10],[3,10],[3,11],[2,11],[2,10],[2,9]],
	'Nanos Sector': [[4,18],[5,18],[5,19],[5,20],[3,20],[3,19],[4,19],[4,18]],
	'Omega Sector': [[5,12],[7,12],[7,11],[8,11],[8,12],[9,12],[9,13],[5,13],[5,12]],
	'Orion Sector': [[2,2],[4,2],[4,3],[4,4],[4,5],[4,6],[3,6],[3,5],[3,4],[2,4],[2,3],[2,2]],
	'Quintus Sector': [[6,15],[9,15],[9,16],[9,17],[8,17],[8,16],[7,16],[7,17],[6,17],[6,16],[6,15]],
	'Rictus Sector': [[3,10],[4,10],[4,11],[4,12],[4,13],[2,13],[2,12],[2,11],[3,11],[3,10]],
	'Rigel Sector': [[6,10],[9,10],[9,11],[9,12],[8,12],[8,11],[7,11],[7,12],[6,12],[6,11],[6,10]],
	'Sagan Sector': [[2,18],[4,18],[4,19],[3,19],[3,20],[2,20],[2,19],[2,18]],
	'Saleria Sector': [[2,13],[4,13],[4,14],[3,14],[3,15],[2,15],[2,14],[2,13]],
	'Severin Sector': [[7,16],[8,16],[8,17],[9,17],[9,18],[7,18],[7,17],[7,16]],
	'Sten Sector': [[7,5],[8,5],[8,4],[9,4],[9,5],[9,6],[9,7],[8,7],[8,6],[7,6],[7,5]],
	'Talus Sector': [[1,22],[2,22],[2,23],[3,23],[3,22],[4,22],[4,23],[4,0],[1,0],[1,23],[1,22]],
	'Tanis Sector': [[4,23],[7,23],[7,0],[6,0],[6,1],[5,1],[5,0],[4,0],[4,23]],
	'Tarragon Sector': [[3,15],[5,15],[5,16],[5,17],[4,17],[4,16],[3,16],[3,15]],
	'Theseus Sector': [[3,17],[6,17],[6,18],[3,18],[3,17]],
	'Trigon Sector': [[7,18],[9,18],[9,19],[8,19],[8,20],[6,20],[6,19],[7,19],[7,18]],
	'Umlaut Sector': [[4,3],[5,3],[5,4],[5,5],[5,6],[4,6],[4,5],[4,4],[4,3]],
	'Ursa Sector': [[3,7],[6,7],[6,8],[3,8],[3,7]],
	'Valdis Sector': [[6,21],[9,21],[9,22],[8,22],[8,23],[6,23],[6,22],[6,21]],
	'Xi Tauri Sector': [[6,15],[6,14],[7,14],[7,13],[9,13],[9,14],[9,15],[6,15]],
	'Xzar Sector': [[7,17],[7,18],[7,19],[5,19],[5,18],[6,18],[6,17],[7,17]],
	'Ymir Sector': [[6,20],[8,20],[8,19],[9,19],[9,20],[9,21],[6,21],[6,20]]
};

function drawDefinedShapes() {
	const svgNS = 'http://www.w3.org/2000/svg';
	const plot = document.getElementById('svgOverlay');
	const svgSize = plot.clientWidth;

	plot.innerHTML = ''; // Clear any existing SVG content

	const svg = document.createElementNS(svgNS, 'svg');
	svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
	plot.appendChild(svg);

	// Define Automaton pattern
	const patternAutomatons = document.createElementNS(svgNS, 'pattern');
	patternAutomatons.setAttribute('id', 'Automatons');
	patternAutomatons.setAttribute('patternUnits', 'userSpaceOnUse');
	patternAutomatons.setAttribute('patternTransform', 'rotate(120)');
	patternAutomatons.setAttribute('width', 20);
	patternAutomatons.setAttribute('height', 20);
	const patternAutomatonsRect = document.createElementNS(svgNS, 'rect');
	patternAutomatonsRect.setAttribute('x', '0');
	patternAutomatonsRect.setAttribute('y', '0');
	patternAutomatonsRect.setAttribute('width', '100%');
	patternAutomatonsRect.setAttribute('height', '100%');
	patternAutomatonsRect.setAttribute('fill', '#87172D');
	patternAutomatons.appendChild(patternAutomatonsRect);
	const patternAutomatonsPath = document.createElementNS(svgNS, 'path');
	patternAutomatonsPath.setAttribute('d', 'M0 10h20z');
	patternAutomatonsPath.setAttribute('stroke', '#98394C');
	patternAutomatonsPath.setAttribute('stroke-width', 8);
	patternAutomatons.appendChild(patternAutomatonsPath);
	svg.appendChild(patternAutomatons);

	// Define Terminid pattern
	const patternTerminids = document.createElementNS(svgNS, 'pattern');
	patternTerminids.setAttribute('id', 'Terminids');
	patternTerminids.setAttribute('patternUnits', 'userSpaceOnUse');
	patternTerminids.setAttribute('patternTransform', 'rotate(120)');
	patternTerminids.setAttribute('width', 20);
	patternTerminids.setAttribute('height', 20);
	const patternTerminidsRect = document.createElementNS(svgNS, 'rect');
	patternTerminidsRect.setAttribute('x', '0');
	patternTerminidsRect.setAttribute('y', '0');
	patternTerminidsRect.setAttribute('width', '100%');
	patternTerminidsRect.setAttribute('height', '100%');
	patternTerminidsRect.setAttribute('fill', '#9E7229');
	patternTerminids.appendChild(patternTerminidsRect);
	const patternTerminidsPath = document.createElementNS(svgNS, 'path');
	patternTerminidsPath.setAttribute('d', 'M0 10h20z');
	patternTerminidsPath.setAttribute('stroke', '#AC8748');
	patternTerminidsPath.setAttribute('stroke-width', 8);
	patternTerminids.appendChild(patternTerminidsPath);
	svg.appendChild(patternTerminids);

	// Define Illuminate pattern
	const patternIlluminate = document.createElementNS(svgNS, 'pattern');
	patternIlluminate.setAttribute('id', 'Illuminate');
	patternIlluminate.setAttribute('patternUnits', 'userSpaceOnUse');
	patternIlluminate.setAttribute('patternTransform', 'rotate(120)');
	patternIlluminate.setAttribute('width', 20);
	patternIlluminate.setAttribute('height', 20);
	const patternIlluminateRect = document.createElementNS(svgNS, 'rect');
	patternIlluminateRect.setAttribute('x', '0');
	patternIlluminateRect.setAttribute('y', '0');
	patternIlluminateRect.setAttribute('width', '100%');
	patternIlluminateRect.setAttribute('height', '100%');
	patternIlluminateRect.setAttribute('fill', '#172984');
	patternIlluminate.appendChild(patternIlluminateRect);
	const patternIlluminatePath = document.createElementNS(svgNS, 'path');
	patternIlluminatePath.setAttribute('d', 'M0 10h20z');
	patternIlluminatePath.setAttribute('stroke', '#394896');
	patternIlluminatePath.setAttribute('stroke-width', 8);
	patternIlluminate.appendChild(patternIlluminatePath);
	svg.appendChild(patternIlluminate);


	// Draw the filled paths first
	Object.entries(groups).forEach(([groupName, points]) => {
		// Create the patter fill path
		const sectorPatternPath = document.createElementNS(svgNS, 'path');
		sectorPatternPath.setAttribute('d', getPathDescription(points, svgSize));
		sectorPatternPath.setAttribute('stroke', 'white');
		sectorPatternPath.setAttribute('stroke-width', 4);
		sectorPatternPath.setAttribute('fill', 'black'); // Replace with your solid color
		// Attach the path to the SVG
		svg.appendChild(sectorPatternPath);

		// Attach event listener to the group for changing color
		sectorPatternPath.addEventListener('click', function() {
			changeColor(sectorPatternPath);
		});
	});

	// Draw the strokes in a separate pass, so they are on top of the filled paths
	Object.entries(groups).forEach(([groupName, points]) => {
		const sectorStrokePath = document.createElementNS(svgNS, 'path');
		sectorStrokePath.setAttribute('d', getPathDescription(points, svgSize));
		sectorStrokePath.setAttribute('fill', 'none');
		sectorStrokePath.setAttribute('stroke', 'white');
		sectorStrokePath.setAttribute('stroke-width', 0);
		svg.appendChild(sectorStrokePath);
	});
}

function changeColor(sector) {
	console.log(sector);
	const colors = ['black', 'url(#Automatons)', 'url(#Terminids)', 'url(#Illuminate)'];	
	const currentColor = sector.getAttribute('fill');
	const currentIndex = colors.indexOf(currentColor);
	const nextIndex = (currentIndex + 1) % colors.length;
	sector.setAttribute('fill', colors[nextIndex]);
}

function getPathDescription(points) {
	const numberOfRings = 10;
	const numberOfPointsPerRing = 24;
	const svgSize = document.getElementById('svgOverlay').clientWidth;
	const pathCommands = [];

	points.forEach((point, i) => {
		const [ringIndex, pointIndex] = point;
		const radius = ((ringIndex + 1) / numberOfRings) * (svgSize / 2);
		const coords = getRingPointCoordinates(point);

		if (i === 0) {
			pathCommands.push(`M${coords.x},${coords.y}`);
		} else {
			const prevPoint = points[i - 1];
			const prevCoords = getRingPointCoordinates(prevPoint);

			if (ringIndex === prevPoint[0]) {
				// Both points are on the same ring
				let sweepFlag = 1;
				const delta = pointIndex - prevPoint[1];
				let largeArcFlag = 0;

				// Normalize delta to be within -12 to 12 range
				let normalizedDelta = delta % numberOfPointsPerRing;
				if (normalizedDelta > numberOfPointsPerRing / 2) {
					normalizedDelta -= numberOfPointsPerRing;
				} else if (normalizedDelta < -numberOfPointsPerRing / 2) {
					normalizedDelta += numberOfPointsPerRing;
				}

				// Set flags based on normalized delta
				largeArcFlag = Math.abs(normalizedDelta) > numberOfPointsPerRing / 2 ? 1 : 0;
				sweepFlag = normalizedDelta > 0 ? 1 : 0;

				pathCommands.push(`A${radius},${radius} 0 ${largeArcFlag},${sweepFlag} ${coords.x},${coords.y}`);
			} else {
				// Points are on different rings
				pathCommands.push(`L${coords.x},${coords.y}`);
			}
		}
	});

	// Automatically close the path by connecting the last and first points
	if (points.length > 1 && points[0][0] === points[points.length - 1][0]) {
		const firstCoords = getRingPointCoordinates(points[0]);
		pathCommands.push(`L${firstCoords.x},${firstCoords.y}`);
	}

	return pathCommands.join(' ') + ' Z';
}

function getRingPointCoordinates([ringIndex, pointIndex]) {
	const numberOfRings = 10;
	const numberOfPointsPerRing = 24;
	const svgSize = document.getElementById('svgOverlay').clientWidth;
	const radius = ((ringIndex + 1) / numberOfRings) * (svgSize / 2)*0.886;
	const angleDegrees = (pointIndex / numberOfPointsPerRing) * 360;
	return polarToCartesian(svgSize / 2, svgSize / 2, radius, angleDegrees);
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}