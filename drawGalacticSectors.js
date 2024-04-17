window.addEventListener('resize', drawGalacticSectors);
document.addEventListener('DOMContentLoaded', drawGalacticSectors);

const galacticSectors = {
	'Akira Sector': [[4,12],[5,12],[5,13],[7,13],[7,14],[4,14],[4,12]],
	'Alstrad Sector': [[5,15],[6,15],[6,17],[5,17],[5,15]],
	'Altus Sector': [[0,0],[1,0],[1,6],[0,6],[0,0]],
	'Andromeda Sector': [[4,20],[5,20],[5,19],[6,19],[6,20],[6,21],[4,21],[4,20]],
	'Arturion Sector': [[4,0],[5,0],[5,1],[6,1],[6,0],[7,0],[7,2],[4,2],[4,0]],
	'Barnard Sector': [[0,6],[1,6],[1,7],[2,7],[2,9],[1,9],[1,11],[0,11],[0,6]],
	'Borgus Sector': [[4,6],[6,6],[6,7],[4,7],[4,6]],
	'Cancri Sector': [[0,11],[1,11],[1,9],[2,9],[2,13],[0,13],[0,11]],
	'Cantolus Sector': [[0,14],[1,14],[1,15],[2,15],[2,17],[1,17],[1,18],[0,18],[0,14]],
	'Celeste Sector': [[1,2],[2,2],[2,4],[3,4],[3,6],[1,6],[1,2]],
	'Draco Sector': [[5,4],[7,4],[7,5],[5,5],[5,4]],
	'Falstaff Sector': [[4,2],[7,2],[7,3],[4,3],[4,2]],
	'Farsight Sector': [[6,7],[9,7],[9,9],[7,9],[7,8],[6,8],[6,7]],
	'Ferris Sector': [[5,8],[6,8],[6,11],[5,11],[5,8]],
	'Gallux Sector': [[2,8],[5,8],[5,10],[4,10],[4,9],[2,9],[2,8]],
	'Gellert Sector': [[7,23],[8,23],[8,22],[9,22],[9,0],[8,0],[8,1],[7,1],[7,23]],
	'Gothmar Sector': [[0,13],[2,13],[2,15],[1,15],[1,14],[0,14],[0,13]],
	'Guang Sector': [[3,14],[6,14],[6,15],[3,15],[3,14]],
	'Hanzo Sector': [[4,10],[5,10],[5,11],[6,11],[6,12],[4,12],[4,10]],
	'Hawking Sector': [[7,1],[8,1],[8,0],[9,0],[9,2],[7,2],[7,1]],
	'Hydra Sector': [[3,20],[4,20],[4,21],[5,21],[5,22],[3,22],[3,20]],
	'Idun Sector': [[0,18],[1,18],[1,17],[3,17],[3,18],[2,18],[2,19],[0,19],[0,18]],
	'Iptus Sector': [[1,0],[4,0],[4,2],[1,2],[1,0]],
	'Jin Xi Sector': [[5,5],[7,5],[7,6],[8,6],[8,7],[6,7],[6,6],[5,6],[5,5]],
	'Kelvin Sector': [[0,19],[2,19],[2,20],[1,20],[1,0],[0,0],[0,19]],
	'Korpus Sector': [[1,6],[4,6],[4,7],[3,7],[3,8],[2,8],[2,7],[1,7],[1,6]],
	'L\'estrade Sector': [[7,2],[9,2],[9,4],[8,4],[8,5],[7,5],[7,2]],
	'Lacaille Sector': [[5,21],[6,21],[6,22],[6,23],[4,23],[4,22],[5,22],[5,21]],
	'Leo Sector': [[6,8],[7,8],[7,9],[9,9],[9,10],[6,10],[6,8]],
	'Marspira Sector': [[1,20],[3,20],[3,23],[2,23],[2,22],[1,22],[1,20]],
	'Meridian Sector': [[2,15],[3,15],[3,16],[4,16],[4,17],[2,17],[2,15]],
	'Mirin Sector': [[5,3],[7,3],[7,4],[5,4],[5,3]],
	'Morgon Sector': [[2,9],[4,9],[4,10],[3,10],[3,11],[2,11],[2,9]],
	'Nanos Sector': [[4,18],[5,18],[5,20],[3,20],[3,19],[4,19],[4,18]],
	'Omega Sector': [[5,12],[7,12],[7,11],[8,11],[8,12],[9,12],[9,13],[5,13],[5,12]],
	'Orion Sector': [[2,2],[4,2],[4,6],[3,6],[3,4],[2,4],[2,2]],
	'Quintus Sector': [[6,15],[9,15],[9,17],[8,17],[8,16],[7,16],[7,17],[6,17],[6,15]],
	'Rictus Sector': [[3,10],[4,10],[4,13],[2,13],[2,11],[3,11],[3,10]],
	'Rigel Sector': [[6,10],[9,10],[9,12],[8,12],[8,11],[7,11],[7,12],[6,12],[6,10]],
	'Sagan Sector': [[2,18],[4,18],[4,19],[3,19],[3,20],[2,20],[2,18]],
	'Saleria Sector': [[2,13],[4,13],[4,14],[3,14],[3,15],[2,15],[2,13]],
	'Severin Sector': [[7,16],[8,16],[8,17],[9,17],[9,18],[7,18],[7,16]],
	'Sten Sector': [[7,5],[8,5],[8,4],[9,4],[9,7],[8,7],[8,6],[7,6],[7,5]],
	'Talus Sector': [[1,22],[2,22],[2,23],[3,23],[3,22],[4,22],[4,0],[1,0],[1,22]],
	'Tanis Sector': [[4,23],[7,23],[7,0],[6,0],[6,1],[5,1],[5,0],[4,0],[4,23]],
	'Tarragon Sector': [[3,15],[5,15],[5,17],[4,17],[4,16],[3,16],[3,15]],
	'Theseus Sector': [[3,17],[6,17],[6,18],[3,18],[3,17]],
	'Trigon Sector': [[7,18],[9,18],[9,19],[8,19],[8,20],[6,20],[6,19],[7,19],[7,18]],
	'Umlaut Sector': [[4,3],[5,3],[5,6],[4,6],[4,3]],
	'Ursa Sector': [[3,7],[6,7],[6,8],[3,8],[3,7]],
	'Valdis Sector': [[6,21],[9,21],[9,22],[8,22],[8,23],[6,23],[6,21]],
	'Xi Tauri Sector': [[6,15],[6,14],[7,14],[7,13],[9,13],[9,15],[6,15]],
	'Xzar Sector': [[7,17],[7,19],[5,19],[5,18],[6,18],[6,17],[7,17]],
	'Ymir Sector': [[6,20],[8,20],[8,19],[9,19],[9,20],[9,21],[6,21],[6,20]]
};

const galacticSectorsColors = {
	'Sol System': 'blue',
	'Akira Sector'		: '#000000',
	'Alstrad Sector'	: '#000080',
	'Altus Sector'		: '#0000FF',
	'Andromeda Sector'	: '#008000',
	'Arturion Sector'	: '#008080',
	'Barnard Sector'	: '#00FF00',
	'Borgus Sector'		: '#00FFFF',
	'Cancri Sector'		: '#800000',
	'Cantolus Sector'	: '#800080',
	'Celeste Sector'	: '#808000',
	'Draco Sector'		: '#808080',
	'Falstaff Sector'	: '#8B4513',
	'Farsight Sector'	: '#A52A2A',
	'Ferris Sector'		: '#B22222',
	'Gallux Sector'		: '#C0C0C0',
	'Gellert Sector'	: '#D2691E',
	'Gothmar Sector'	: '#DC143C',
	'Guang Sector'		: '#FF0000',
	'Hanzo Sector'		: '#FF4500',
	'Hawking Sector'	: '#FF6347',
	'Hydra Sector'		: '#FF7F50',
	'Idun Sector'		: '#FF8C00',
	'Iptus Sector'		: '#FFA500',
	'Jin Xi Sector'		: '#FFB6C1',
	'Kelvin Sector'		: '#FFC0CB',
	'Korpus Sector'		: '#FFD700',
	'L\'estrade Sector'	: '#FFDAB9',
	'Lacaille Sector'	: '#FFE4B5',
	'Leo Sector'		: '#FFE4C4',
	'Marspira Sector'	: '#FFE4E1',
	'Meridian Sector'	: '#FFEBCD',
	'Mirin Sector'		: '#FFEDFA',
	'Morgon Sector'		: '#FFF0F5',
	'Nanos Sector'		: '#FFF5EE',
	'Omega Sector'		: '#FFF8DC',
	'Orion Sector'		: '#FFFACD',
	'Quintus Sector'	: '#FFFAF0',
	'Rictus Sector'		: '#FFFAFA',
	'Rigel Sector'		: '#FFFF00',
	'Sagan Sector'		: '#FFFFE0',
	'Saleria Sector'	: '#FFFFF0',
	'Severin Sector'	: '#FFFFFF',
	'Sten Sector'		: '#1E90FF',
	'Talus Sector'		: '#20B2AA',
	'Tanis Sector'		: '#228B22',
	'Tarragon Sector'	: '#2E8B57',
	'Theseus Sector'	: '#2F4F4F',
	'Trigon Sector'		: '#32CD32',
	'Umlaut Sector'		: '#3CB371',
	'Ursa Sector'		: '#40E0D0',
	'Valdis Sector'		: '#4169E1',
	'Xi Tauri Sector'	: '#4682B4',
	'Xzir Sector'		: '#483D8B',
	'Ymir Sector'		: '#48D1CC'
};

function drawGalacticSectors() {
	const svgNS = 'http://www.w3.org/2000/svg';
	const svgOverlay = document.getElementById('svgOverlay');
	const numberOfRings = 10;
	const numberOfPointsPerRing = 24;
	const svgSize = svgOverlay.clientWidth; // Assumes svgOverlay div is square and its width is set via CSS

	svgOverlay.innerHTML = ''; // Clear any existing SVG content

	const svg = document.createElementNS(svgNS, 'svg');
	svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
	svgOverlay.appendChild(svg);

	Object.entries(galacticSectors).forEach(([groupName, points]) => {
		const shapePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		shapePath.setAttribute('fill', 'green');
		shapePath.setAttribute('fill-opacity', 0.1);
		shapePath.setAttribute('stroke', 'green');
		shapePath.setAttribute('stroke-width', 6);
		shapePath.setAttribute('d', getPathDescription(points));
		svg.appendChild(shapePath);
	});
}

function getPathDescription(points) {
    const numberOfRings = 10;
    const numberOfPointsPerRing = 24;
    const svgSize = document.getElementById('svgOverlay').clientWidth;
    const pathCommands = [];

    points.forEach((point, i) => {
        const [ringIndex, pointIndex] = point;
        const radius = ((ringIndex + 1) / numberOfRings) * (svgSize / 2)*0.886;
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