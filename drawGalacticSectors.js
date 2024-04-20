window.addEventListener('resize', drawDefinedShapes);
document.addEventListener('DOMContentLoaded', drawDefinedShapes);


const sectors = {
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

const sectorNameShift = {
	'Super Earth': [0,5.3],
	'Akira Sector': [-12,5],
	'Alstrad Sector': [-6.8,-5],
	'Altus Sector': [6,0],
	'Andromeda Sector': [-2.5,-5.5],
	'Arturion Sector': [12,-6],
	'Barnard Sector': [3,4.5],
	'Borgus Sector': [4.5,3.5],
	'Cancri Sector': [1,6.2],
	'Cantolus Sector': [-6,0.2],
	'Celeste Sector': [9,4],
	'Draco Sector': [6.5,1.5],
	'Falstaff Sector': [7,-4],
	'Farsight Sector': [5,10],
	'Ferris Sector': [-6,10],
	'Gallux Sector': [6,7],
	'Gellert Sector': [5,-6],
	'Gothmar Sector': [-4.5,5.5],
	'Guang Sector': [-7,4],
	'Hanzo Sector': [-7,7],
	'Hawking Sector': [6,-4],
	'Hydra Sector': [3,-8],
	'Idun Sector': [-7.5,0],
	'Iptus Sector': [4,-6.5],
	'Jin Xi Sector': [8.5,7.5],
	'Kelvin Sector': [-0.4,-4.5],
	'Korpus Sector': [7,3.5],
	'L\'estrade Sector': [14,5],
	'Lacaille Sector': [9,-7],
	'Leo Sector': [-5,15],
	'Marspira Sector': [-2,-7],
	'Meridian Sector': [-7,-3],
	'Mirin Sector': [6,0],
	'Morgon Sector': [0,4],
	'Nanos Sector': [1,-9],
	'Omega Sector': [-4,9],
	'Orion Sector': [8,-1],
	'Quintus Sector': [-10,-1],
	'Rictus Sector': [-9,2],
	'Rigel Sector': [-2,9],
	'Sagan Sector': [-3,-3],
	'Saleria Sector': [-3.5,2],
	'Severin Sector': [-9,-12],
	'Sten Sector': [6,4.5],
	'Talus Sector': [2.7,-9],
	'Tanis Sector': [6,-8.5],
	'Tarragon Sector': [-7,0],
	'Theseus Sector': [-8,-2],
	'Trigon Sector': [-1.5,-10],
	'Umlaut Sector': [7.2,6],
	'Ursa Sector': [6,5],
	'Valdis Sector': [3,-10],
	'Xi Tauri Sector': [3,12],
	'Xzar Sector': [3,-14],
	'Ymir Sector': [-5,-8],
};

const enemies = {
	'Automatons'			: ['#87172D', '#98394C'],
	'AutomatonsInactive'	: ['#440C16', '#4C1C26'],
	'Terminids'				: ['#9E7229', '#AC8748'],
	'TerminidsInactive'		: ['#4F3914', '#564424 '],
	// 'Illuminate'			: ['#172984', '#394896'],
	// 'IlluminateInactive'	: ['#0C1442', '#1C244B'],
};

const sectorColors = {};

function drawDefinedShapes() {
	const svgNS = 'http://www.w3.org/2000/svg';
	const plot = document.getElementById('svgOverlay');
	plot.innerHTML = ''; 

	const svgSize = plot.clientWidth;
	const svg = document.createElementNS(svgNS, 'svg');
	svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
	plot.appendChild(svg);

	// Scaling for text and Super Earth logo
	const fontSize = svgSize / 85; 
	const embedSvgSize = 90;

	// Include font-face definition
	const style = document.createElementNS(svgNS, 'style');
	style.textContent = `
	@font-face {
		font-family: 'FS Sinclair';
		src: url('FS Sinclair Regular.otf');
		font-weight: normal;
	}
	@font-face {
		font-family: 'FS Sinclair';
		src: url('FS Sinclair Bold.otf');
		font-weight: bold;
	}`;
	svg.appendChild(style);

	// Create SVG patterns for each enemy type
	Object.entries(enemies).forEach(([enemyName, enemyColors]) => {
		createPattern(svg, enemyName, enemyColors[0], enemyColors[1]);
	});

	// Draw the sectors first
	Object.entries(sectors).forEach(([sectorName, points]) => {
		// Create the pattern fill path
		const sectorPatternPath = document.createElementNS(svgNS, 'path');
		const currentColor = sectorColors[sectorName] || 'black';
		sectorPatternPath.setAttribute('data-name', sectorName)
		sectorPatternPath.setAttribute('d', getPathDescription(points, svgSize));
		sectorPatternPath.setAttribute('stroke', 'white');
		sectorPatternPath.setAttribute('stroke-width', 4);
		sectorPatternPath.setAttribute('fill', currentColor);
		// Attach the path to the SVG
		svg.appendChild(sectorPatternPath);

		// Attach event listener to the group for changing color
		sectorPatternPath.addEventListener('click', function() {
			changeColor(sectorPatternPath);
			drawDefinedShapes();
		});
	});

	// Draw the sector outlines and sector names in a separate pass, so they are on top of the filled sectors
	Object.entries(sectors).forEach(([sectorName, points]) => {
		// Add outlines of the sectors
		const sectorStrokePath = document.createElementNS(svgNS, 'path');
		sectorStrokePath.setAttribute('d', getPathDescription(points, svgSize));
		sectorStrokePath.setAttribute('fill', 'none');
		sectorStrokePath.setAttribute('stroke', 'white');
		sectorStrokePath.setAttribute('stroke-width', 0);
		svg.appendChild(sectorStrokePath);

		if (sectorName !== 'Super Earth') {
			// Add text label for the sector
			const sectorText = document.createElementNS(svgNS, 'text');
			const currentColor = sectorColors[sectorName] || 'black';
			const shift = sectorNameShift[sectorName] || [0, 0];
			const firstPointCoords = getRingPointCoordinates(points[0]);
			const shiftX = svgSize * shift[0] / 100;
			const shiftY = svgSize * shift[1] / 100;

			sectorText.setAttribute('x', firstPointCoords.x + shiftX);
			sectorText.setAttribute('y', firstPointCoords.y + shiftY);

			sectorText.setAttribute('font-size', fontSize);
			sectorText.setAttribute('text-anchor', 'middle'); 
			sectorText.setAttribute('fill', 'white');
			sectorText.setAttribute('font-family', 'FS Sinclair');
			sectorText.setAttribute('font-weight', currentColor !== 'black' ? 'bold' : 'normal');
			
			// Create the tspan for the sector name (excluding the word 'Sector')
			const tspanName = document.createElementNS(svgNS, 'tspan');
			tspanName.textContent = sectorName.replace(' Sector', '');
			sectorText.appendChild(tspanName);

			// Create the tspan for the word 'Sector'
			const tspanSector = document.createElementNS(svgNS, 'tspan');
			tspanSector.setAttribute('x', sectorText.getAttribute('x')); // Align with the first tspan
			tspanSector.setAttribute('dy', '1.2em'); // Shift the 'Sector' text to the next line
			tspanSector.textContent = 'Sector';
			sectorText.appendChild(tspanSector)
			svg.appendChild(sectorText);
		}
	});

	// Now embed the 'Super Earth White.svg' at the center
	const centerX = svgSize / 2;
	const centerY = svgSize / 2;

	const image = document.createElementNS(svgNS, 'image');
	image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'Super Earth White.svg');
	image.setAttribute('x', centerX - embedSvgSize / 2); // Center the image
	image.setAttribute('y', centerY - embedSvgSize / 2);
	image.setAttribute('width', embedSvgSize);
	image.setAttribute('height', embedSvgSize);
	svg.appendChild(image);

};

// This function create a striped SVG pattern definition.
function createPattern(svg, id, color, stripeColor) {
	const svgNS = 'http://www.w3.org/2000/svg';
	const pattern = document.createElementNS(svgNS, 'pattern');
	pattern.setAttribute('id', id);
	pattern.setAttribute('patternUnits', 'userSpaceOnUse');
	pattern.setAttribute('patternTransform', 'rotate(120)');
	pattern.setAttribute('width', 20);
	pattern.setAttribute('height', 20);
	const rect = document.createElementNS(svgNS, 'rect');
	rect.setAttribute('width', '100%');
	rect.setAttribute('height', '100%');
	rect.setAttribute('fill', color);
	pattern.appendChild(rect);
	const path = document.createElementNS(svgNS, 'path');
	path.setAttribute('d', 'M0 10h20z');
	path.setAttribute('stroke', stripeColor);
	path.setAttribute('stroke-width', 8);
	pattern.appendChild(path);
	svg.appendChild(pattern);
	return pattern;
};

// This funtion changes sector fill type.
function changeColor(sector) {
	const sectorName = sector.getAttribute('data-name'); // Ensure you set this attribute when creating the path
	const colors = ['black', 'url(#AutomatonsInactive)', 'url(#Automatons)', 'url(#TerminidsInactive)', 'url(#Terminids)'];
	const currentColorIndex = sectorColors[sectorName] ? colors.indexOf(sectorColors[sectorName]) : 0;
	const nextColorIndex = (currentColorIndex + 1) % colors.length;
	const nextColor = colors[nextColorIndex];

	sector.setAttribute('fill', nextColor);
	sectorColors[sectorName] = nextColor; // Store the new color in the state object
}

// This function generates the SVG path data for a set of points representing a sector.
function getPathDescription(points) {
	// Constants for the number of rings and points per ring
	const numberOfRings = 10;
	const numberOfPointsPerRing = 24;
	// Get the size of the SVG overlay for scaling the sectors correctly
	const svgSize = document.getElementById('svgOverlay').clientWidth;
	// Initialize an array to hold the SVG path commands
	const pathCommands = [];

	// Loop through each point in the array of points
	points.forEach((point, i) => {
		// Destructure the point to get ringIndex and pointIndex
		const [ringIndex, pointIndex] = point;
		// Calculate the radius for the current ring
		const radius = ((ringIndex + 1) / numberOfRings) * (svgSize / 2);
		// Get the Cartesian coordinates for the current point
		const coords = getRingPointCoordinates(point);

		// If it's the first point, move the path to this point (M command)
		if (i === 0) {
			pathCommands.push(`M${coords.x},${coords.y}`);
		} else {
			// Get the previous point and its coordinates
			const prevPoint = points[i - 1];
			const prevCoords = getRingPointCoordinates(prevPoint);

			// Check if the current point is on the same ring as the previous point
			if (ringIndex === prevPoint[0]) {
				// Initialize the sweepFlag as 1 (default for clockwise arc)
				let sweepFlag = 1;
				// Calculate the difference in the point index between current and previous points
				const delta = pointIndex - prevPoint[1];
				// Initialize the largeArcFlag as 0 (default for arc less than 180 degrees)
				let largeArcFlag = 0;

				// Normalize delta to be within -12 to 12 range for proper arc direction
				let normalizedDelta = delta % numberOfPointsPerRing;
				if (normalizedDelta > numberOfPointsPerRing / 2) {
					normalizedDelta -= numberOfPointsPerRing;
				} else if (normalizedDelta < -numberOfPointsPerRing / 2) {
					normalizedDelta += numberOfPointsPerRing;
				}

				// Set largeArcFlag to 1 for arcs spanning more than half the circle
				largeArcFlag = Math.abs(normalizedDelta) > numberOfPointsPerRing / 2 ? 1 : 0;
				// Set sweepFlag to 0 for counter-clockwise arcs
				sweepFlag = normalizedDelta > 0 ? 1 : 0;

				// Add the arc command to the path
				pathCommands.push(`A${radius},${radius} 0 ${largeArcFlag},${sweepFlag} ${coords.x},${coords.y}`);
			} else {
				// If the points are on different rings, draw a line to the current point
				pathCommands.push(`L${coords.x},${coords.y}`);
			}
		}
	});

	// If the path is a closed loop, draw a line to the first point to close the path
	if (points.length > 1 && points[0][0] === points[points.length - 1][0]) {
		const firstCoords = getRingPointCoordinates(points[0]);
		pathCommands.push(`L${firstCoords.x},${firstCoords.y}`);
	}

	// Join all the path commands into a single string and close the path with 'Z'
	return pathCommands.join(' ') + ' Z';
};

// This function takes polar coordinates (ring and point index) and converts them into Cartesian (x, y) coordinates.
function getRingPointCoordinates([ringIndex, pointIndex]) {
	// Define the total number of rings and the number of points per ring.
	const numberOfRings = 10;
	const numberOfPointsPerRing = 24;
	// Retrieve the current width of the SVG overlay, which will scale the size of the rings.
	const svgSize = document.getElementById('svgOverlay').clientWidth;
	// Calculate the radius for the given ring index. 
	const radius = ((ringIndex + 1) / numberOfRings) * (svgSize / 2);
	// Convert the point index to an angle in degrees. One full cycle (0 to 360 degrees) is divided
	// by the total number of points per ring to find the angle for the specific point index.
	const angleDegrees = (pointIndex / numberOfPointsPerRing) * 360;
	// Call the polarToCartesian function to convert the polar coordinates (radius and angle) to Cartesian coordinates.
	return polarToCartesian(svgSize / 2, svgSize / 2, radius, angleDegrees);
};

// This function converts polar coordinates to Cartesian coordinates.
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	// Adjust the angle from degrees to radians since JavaScript's Math functions use radians.
	// The angle is also adjusted by -90 degrees to align 0 degrees with the top of the circle.
	const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
	// Calculate the x and y coordinates using the cosine and sine of the angle, respectively.
	// The center of the circle (centerX, centerY) is added to the result to translate the coordinates
	// appropriately within the SVG canvas.
	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
};