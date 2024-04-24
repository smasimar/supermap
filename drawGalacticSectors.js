window.addEventListener('resize', drawDefinedShapes);
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and cache the external SVG on initial load
    cacheExternalResources().then(drawDefinedShapes);
});

const sectorData = {
    'Akira Sector':{
        'color': 'black',
        'shift': [-12,5],
        'points': [[4,12],[5,12],[5,13],[7,13],[7,14],[4,14],[4,13],[4,12]],
    },
    'Alstrad Sector':{
        'color': 'black',
        'shift': [-6.8,-5],
        'points': [[5,15],[6,15],[6,16],[6,17],[5,17],[5,16],[5,15]],
    },
    'Altus Sector':{
        'color': 'black',
        'shift': [6,0],
        'points': [[0,0],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[0,6],[0,5],[0,4],[0,3],[0,2],[0,1],[0,0]],
    },
    'Andromeda Sector':{
        'color': 'black',
        'shift': [-2.5,-5.5],
        'points': [[4,20],[5,20],[5,19],[6,19],[6,20],[6,21],[4,21],[4,20]],
    },
    'Arturion Sector':{
        'color': 'black',
        'shift': [12,-6],
        'points': [[4,0],[5,0],[5,1],[6,1],[6,0],[7,0],[7,1],[7,2],[4,2],[4,1],[4,0]],
    },
    'Barnard Sector':{
        'color': 'black',
        'shift': [3,4.5],
        'points': [[0,6],[1,6],[1,7],[2,7],[2,8],[2,9],[1,9],[1,10],[1,11],[0,11],[0,10],[0,9],[0,8],[0,7],[0,6]],
    },
    'Borgus Sector':{
        'color': 'black',
        'shift': [4.5,3.5],
        'points': [[4,6],[6,6],[6,7],[4,7],[4,6]],
    },
    'Cancri Sector':{
        'color': 'black',
        'shift': [1,6.2],
        'points': [[0,11],[1,11],[1,10],[1,9],[2,9],[2,10],[2,11],[2,12],[2,13],[0,13],[0,12],[0,11]],
    },
    'Cantolus Sector':{
        'color': 'black',
        'shift': [-6,0.2],
        'points': [[0,14],[1,14],[1,15],[2,15],[2,16],[2,17],[1,17],[1,18],[0,18],[0,17],[0,16],[0,15],[0,14]],
    },
    'Celeste Sector':{
        'color': 'black',
        'shift': [9,4],
        'points': [[1,2],[2,2],[2,3],[2,4],[3,4],[3,5],[3,6],[1,6],[1,5],[1,4],[1,3],[1,2]],
    },
    'Draco Sector':{
        'color': 'black',
        'shift': [6.5,1.5],
        'points': [[5,4],[7,4],[7,5],[5,5],[5,4]],
    },
    'Falstaff Sector':{
        'color': 'black',
        'shift': [7,-4],
        'points': [[4,2],[7,2],[7,3],[4,3],[4,2]],
    },
    'Farsight Sector':{
        'color': 'black',
        'shift': [5,10],
        'points': [[6,7],[9,7],[9,8],[9,9],[7,9],[7,8],[6,8],[6,7]],
    },
    'Ferris Sector':{
        'color': 'black',
        'shift': [-6,10],
        'points': [[5,8],[6,8],[6,9],[6,10],[6,11],[5,11],[5,10],[5,9],[5,8]],
    },
    'Gallux Sector':{
        'color': 'black',
        'shift': [6,7],
        'points': [[2,8],[5,8],[5,9],[5,10],[4,10],[4,9],[2,9],[2,8]],
    },
    'Gellert Sector':{
        'color': 'black',
        'shift': [5,-6],
        'points': [[7,23],[8,23],[8,22],[9,22],[9,23],[9,0],[8,0],[8,1],[7,1],[7,0],[7,23]],
    },
    'Gothmar Sector':{
        'color': 'black',
        'shift': [-4.5,5.5],
        'points': [[0,13],[2,13],[2,14],[2,15],[1,15],[1,14],[0,14],[0,13]],
    },
    'Guang Sector':{
        'color': 'black',
        'shift': [-7,4],
        'points': [[3,14],[6,14],[6,15],[3,15],[3,14]],
    },
    'Hanzo Sector':{
        'color': 'black',
        'shift': [-7,7],
        'points': [[4,10],[5,10],[5,11],[6,11],[6,12],[4,12],[4,11],[4,10]],
    },
    'Hawking Sector':{
        'color': 'black',
        'shift': [6,-4],
        'points': [[7,1],[8,1],[8,0],[9,0],[9,1],[9,2],[7,2],[7,1]],
    },
    'Hydra Sector':{
        'color': 'black',
        'shift': [2,-8],
        'points': [[3,20],[4,20],[4,21],[5,21],[5,22],[3,22],[3,21],[3,20]],
    },
    'Idun Sector':{
        'color': 'black',
        'shift': [-7.5,0],
        'points': [[0,18],[1,18],[1,17],[3,17],[3,18],[2,18],[2,19],[0,19],[0,18]],
    },
    'Iptus Sector':{
        'color': 'black',
        'shift': [4,-6.5],
        'points': [[1,0],[4,0],[4,1],[4,2],[1,2],[1,1],[1,0]],
    },
    'Jin Xi Sector':{
        'color': 'black',
        'shift': [8.5,7.5],
        'points': [[5,5],[7,5],[7,6],[8,6],[8,7],[6,7],[6,6],[5,6],[5,5]],
    },
    'Kelvin Sector':{
        'color': 'black',
        'shift': [-0.4,-4.5],
        'points': [[0,19],[2,19],[2,20],[1,20],[1,21],[1,22],[1,23],[1,0],[0,0],[0,23],[0,22],[0,21],[0,20],[0,19]],
    },
    'Korpus Sector':{
        'color': 'black',
        'shift': [7,3.5],
        'points': [[1,6],[4,6],[4,7],[3,7],[3,8],[2,8],[2,7],[1,7],[1,6]],
    },
    'L\'estrade Sector':{
        'color': 'black',
        'shift': [14,5],
        'points': [[7,2],[9,2],[9,3],[9,4],[8,4],[8,5],[7,5],[7,4],[7,3],[7,2]],
    },
    'Lacaille Sector':{
        'color': 'black',
        'shift': [9,-7],
        'points': [[5,21],[6,21],[6,22],[6,23],[4,23],[4,22],[5,22],[5,21]],
    },
    'Leo Sector':{
        'color': 'black',
        'shift': [-5,15],
        'points': [[6,8],[7,8],[7,9],[9,9],[9,10],[6,10],[6,9],[6,8]],
    },
    'Marspira Sector':{
        'color': 'black',
        'shift': [-2,-7],
        'points': [[1,20],[3,20],[3,21],[3,22],[3,23],[2,23],[2,22],[1,22],[1,21],[1,20]],
    },
    'Meridian Sector':{
        'color': 'black',
        'shift': [-7,-3],
        'points': [[2,15],[3,15],[3,16],[4,16],[4,17],[2,17],[2,16],[2,15]],
    },
    'Mirin Sector':{
        'color': 'black',
        'shift': [6,0],
        'points': [[5,3],[7,3],[7,4],[5,4],[5,3]],
    },
    'Morgon Sector':{
        'color': 'black',
        'shift': [0,4],
        'points': [[2,9],[4,9],[4,10],[3,10],[3,11],[2,11],[2,10],[2,9]],
    },
    'Nanos Sector':{
        'color': 'black',
        'shift': [1,-9],
        'points': [[4,18],[5,18],[5,19],[5,20],[3,20],[3,19],[4,19],[4,18]],
    },
    'Omega Sector':{
        'color': 'black',
        'shift': [-4,9],
        'points': [[5,12],[7,12],[7,11],[8,11],[8,12],[9,12],[9,13],[5,13],[5,12]],
    },
    'Orion Sector':{
        'color': 'black',
        'shift': [8,-1],
        'points': [[2,2],[4,2],[4,3],[4,4],[4,5],[4,6],[3,6],[3,5],[3,4],[2,4],[2,3],[2,2]],
    },
    'Quintus Sector':{
        'color': 'black',
        'shift': [-10,-1],
        'points': [[6,15],[9,15],[9,16],[9,17],[8,17],[8,16],[7,16],[7,17],[6,17],[6,16],[6,15]],
    },
    'Rictus Sector':{
        'color': 'black',
        'shift': [-9,2],
        'points': [[3,10],[4,10],[4,11],[4,12],[4,13],[2,13],[2,12],[2,11],[3,11],[3,10]],
    },
    'Rigel Sector':{
        'color': 'black',
        'shift': [-2,9],
        'points': [[6,10],[9,10],[9,11],[9,12],[8,12],[8,11],[7,11],[7,12],[6,12],[6,11],[6,10]],
    },
    'Sagan Sector':{
        'color': 'black',
        'shift': [-3,-3],
        'points': [[2,18],[4,18],[4,19],[3,19],[3,20],[2,20],[2,19],[2,18]],
    },
    'Saleria Sector':{
        'color': 'black',
        'shift': [-3.5,2],
        'points': [[2,13],[4,13],[4,14],[3,14],[3,15],[2,15],[2,14],[2,13]],
    },
    'Severin Sector':{
        'color': 'black',
        'shift': [-9,-12],
        'points': [[7,16],[8,16],[8,17],[9,17],[9,18],[7,18],[7,17],[7,16]],
    },
    'Sten Sector':{
        'color': 'black',
        'shift': [6,4.5],
        'points': [[7,5],[8,5],[8,4],[9,4],[9,5],[9,6],[9,7],[8,7],[8,6],[7,6],[7,5]],
    },
    'Super Earth':{
        'color': 'black',
        'shift': [0,5.3],
        'points': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],[0,17],[0,18],[0,19],[0,20],[0,21],[0,22],[0,23],[0,0]],
    },
    'Talus Sector':{
        'color': 'black',
        'shift': [2.7,-9],
        'points': [[1,22],[2,22],[2,23],[3,23],[3,22],[4,22],[4,23],[4,0],[1,0],[1,23],[1,22]],
    },
    'Tanis Sector':{
        'color': 'black',
        'shift': [6,-8.5],
        'points': [[4,23],[7,23],[7,0],[6,0],[6,1],[5,1],[5,0],[4,0],[4,23]],
    },
    'Tarragon Sector':{
        'color': 'black',
        'shift': [-7,0],
        'points': [[3,15],[5,15],[5,16],[5,17],[4,17],[4,16],[3,16],[3,15]],
    },
    'Theseus Sector':{
        'color': 'black',
        'shift': [-8,-2],
        'points': [[3,17],[6,17],[6,18],[3,18],[3,17]],
    },
    'Trigon Sector':{
        'color': 'black',
        'shift': [-1.5,-10],
        'points': [[7,18],[9,18],[9,19],[8,19],[8,20],[6,20],[6,19],[7,19],[7,18]],
    },
    'Umlaut Sector':{
        'color': 'black',
        'shift': [7.2,6],
        'points': [[4,3],[5,3],[5,4],[5,5],[5,6],[4,6],[4,5],[4,4],[4,3]],
    },
    'Ursa Sector':{
        'color': 'black',
        'shift': [6,5],
        'points': [[3,7],[6,7],[6,8],[3,8],[3,7]],
    },
    'Valdis Sector':{
        'color': 'black',
        'shift': [3,-10],
        'points': [[6,21],[9,21],[9,22],[8,22],[8,23],[6,23],[6,22],[6,21]],
    },
    'Xi Tauri Sector':{
        'color': 'black',
        'shift': [3,12],
        'points': [[6,15],[6,14],[7,14],[7,13],[9,13],[9,14],[9,15],[6,15]],
    },
    'Xzar Sector':{
        'color': 'black',
        'shift': [3,-14],
        'points': [[7,17],[7,18],[7,19],[5,19],[5,18],[6,18],[6,17],[7,17]],
    },
    'Ymir Sector':{
        'color': 'black',
        'shift': [-5,-8],
        'points': [[6,20],[8,20],[8,19],[9,19],[9,20],[9,21],[6,21],[6,20]],
    },
};

const enemies = {
    'Automatons'            : ['#87172D', '#98394C'],
    'AutomatonsInactive'    : ['#440C16', '#4C1C26'],
    'Terminids'             : ['#9E7229', '#AC8748'],
    'TerminidsInactive'     : ['#4F3914', '#564424 '],
    // 'Illuminate'         : ['#172984', '#394896'],
    // 'IlluminateInactive' : ['#0C1442', '#1C244B'],
};

// Cache for the external SVG content
let externalSvgContent = null;

// Function to fetch and cache the external SVG and font files
async function cacheExternalResources() {
    if (!externalSvgContent) {
        try {
            const svgResponse = await fetch('Super Earth White.svg');
            externalSvgContent = await svgResponse.text();
        } catch (error) {
            console.error('Error loading the SVG:', error);
        }
    }
}

function drawDefinedShapes() {
    const svgNS = 'http://www.w3.org/2000/svg';
    const plot = document.getElementById('svgOverlay');
    const svgSize = 2000; // Standardized SVG size for consistency
    plot.innerHTML = '';
    const svg = createSVG(svgNS, svgSize);
    plot.appendChild(svg);

    const fontSize = svgSize / 85;
    appendStyles(svg, svgNS);

    Object.entries(enemies).forEach(([id, colors]) => {
        createPattern(svg, svgNS, id, colors[0], colors[1]);
    });

    Object.entries(sectorData).forEach(([sectorName, sectorProps]) => {
        drawSector(svg, svgNS, sectorName, sectorProps.points, svgSize, fontSize);
    });

    embedExternalSvg(svg, svgNS, svgSize, 'Super Earth White.svg');
}

function createSVG(svgNS, svgSize) {
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
    return svg;
}

function appendStyles(svg, svgNS) {
    const style = document.createElementNS(svgNS, 'style');
    style.textContent = `
    text {
        font-family: 'FS Sinclair';
        fill: white;
    }
    text.bold {
        font-weight: bold;
    }`;
    svg.appendChild(style);
}

function drawSector(svg, svgNS, sectorName, points, svgSize, fontSize) {
    const sectorPath = document.createElementNS(svgNS, 'path');
    sectorPath.setAttribute('data-name', sectorName);
    sectorPath.setAttribute('d', getPathDescription(points, svgSize));
    sectorPath.setAttribute('stroke', 'white');
    sectorPath.setAttribute('stroke-width', 4);
    sectorPath.setAttribute('fill', sectorData[sectorName].color || 'black');
    svg.appendChild(sectorPath);

    sectorPath.addEventListener('click', () => {
        changeColor(sectorPath);
        drawDefinedShapes();
    });

    if (sectorName !== 'Super Earth') {
        const textElement = createTextElement(svgNS, sectorName, points[0], svgSize, fontSize, sectorData[sectorName].shift);
        svg.appendChild(textElement);
    }
}

function createTextElement(svgNS, sectorName, firstPoint, svgSize, fontSize, shift) {
    const sectorText = document.createElementNS(svgNS, 'text');
    const [shiftX, shiftY] = shift.map(s => svgSize * s / 100);
    const firstPointCoords = getRingPointCoordinates(firstPoint);

    // Set the position for the text element. The position set here is for the first line.
    sectorText.setAttribute('x', firstPointCoords.x + shiftX);
    sectorText.setAttribute('y', firstPointCoords.y + shiftY);
    sectorText.setAttribute('font-size', fontSize);
    sectorText.setAttribute('text-anchor', 'middle'); 
    sectorText.setAttribute('fill', 'white');
    sectorText.setAttribute('font-family', 'FS Sinclair');
    sectorText.setAttribute('font-weight', sectorData[sectorName].color !== 'black' ? 'bold' : 'normal');
    
    // First tspan for the main part of the sector name
    const tspanName = document.createElementNS(svgNS, 'tspan');
    tspanName.textContent = sectorName.replace(' Sector', '');
    sectorText.appendChild(tspanName);

    // Second tspan for the word "Sector", on a new line
    const tspanSector = document.createElementNS(svgNS, 'tspan');
    tspanSector.setAttribute('x', sectorText.getAttribute('x')); // Align horizontally
    tspanSector.setAttribute('dy', '1.1em'); // Move down to the next line
    tspanSector.textContent = 'Sector';
    sectorText.appendChild(tspanSector);

    return sectorText;
}

function embedExternalSvg(svg, svgNS, svgSize, fileName) {
    if (externalSvgContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(externalSvgContent, "image/svg+xml");
        const externalSvg = doc.documentElement;
        const centerX = (svgSize / 2) - ((svgSize / 15) / 2);
        const centerY = (svgSize / 2) - ((svgSize / 15) / 2);
        externalSvg.setAttribute('x', centerX);
        externalSvg.setAttribute('y', centerY);
        externalSvg.setAttribute('width', svgSize / 15);
        externalSvg.setAttribute('height', svgSize / 15);
        svg.appendChild(externalSvg);
    }
};

function changeColor(sector) {
    const sectorName = sector.getAttribute('data-name');
    const colors = ['black', 'url(#AutomatonsInactive)', 'url(#Automatons)', 'url(#TerminidsInactive)', 'url(#Terminids)'];
    const currentColor = sectorData[sectorName].color || 'black';
    const nextColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
    sectorData[sectorName].color = nextColor;
    sector.setAttribute('fill', nextColor);
};

// This function create a striped SVG pattern definition.
function createPattern(svg, svgNS, id, color, stripeColor) {
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

// This function generates the SVG path data for a set of points representing a sector.
function getPathDescription(points) {
    // Constants for the number of rings and points per ring
    const numberOfRings = 10;
    const numberOfPointsPerRing = 24;
    // Get the size of the SVG overlay for scaling the sectors correctly
    // const svgSize = document.getElementById('svgOverlay').clientWidth;
    const svgSize = 2000
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
    // const svgSize = document.getElementById('svgOverlay').clientWidth;
    const svgSize = 2000
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