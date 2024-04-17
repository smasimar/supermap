window.addEventListener('resize', drawSegments);
document.addEventListener('DOMContentLoaded', drawSegments);

function drawSegments() {
	const svgNS = "http://www.w3.org/2000/svg";
	const plot = document.getElementById('svgOverlay');
	plot.innerHTML = ''; // Clear any existing SVG content

	const svg = document.createElementNS(svgNS, 'svg');
	svg.setAttribute('style', 'display: block;');
	plot.appendChild(svg);

	// Set the viewBox dimensions to maintain aspect ratio
	const viewBoxDimension = Math.min(window.innerWidth, window.innerHeight);
	svg.setAttribute('viewBox', `0 0 ${viewBoxDimension} ${viewBoxDimension}`);

	// Variables for drawing
	const centerX = viewBoxDimension / 2;
	const centerY = viewBoxDimension / 2;
	const radius = (viewBoxDimension / 2) * 0.886; // Full width or height, as they are now the same

	const numberOfSectors = 24; // Number of sectors
	const segmentsPerSector = 10; // Number of segments per sector

	let segmentId = 1; // Initialize segment ID counter

	// Starting the loop to generate SVG paths
	for (let segmentIndex = 0; segmentIndex < segmentsPerSector; segmentIndex++) {
		for (let sectorIndex = 0; sectorIndex < numberOfSectors; sectorIndex++) {
			
			// Calculate the angles for the start and end of each sector
			const startAngle = (sectorIndex * (360 / numberOfSectors)) - 90;
			const endAngle = ((sectorIndex + 1) * (360 / numberOfSectors)) - 90;
			
			// Define the inner and outer radii of the segment ring
			const innerRadius = segmentIndex * (radius / segmentsPerSector);
			const outerRadius = (segmentIndex + 1) * (radius / segmentsPerSector);

			// Create the path element for the segment
			const path = document.createElementNS(svgNS, 'path');
			
			// Create the 'd' attribute for the path using the calculated angles and radii
			const d = [
				"M", centerX + innerRadius * Math.cos(Math.PI * startAngle / 180), centerY + innerRadius * Math.sin(Math.PI * startAngle / 180),
				"L", centerX + outerRadius * Math.cos(Math.PI * startAngle / 180), centerY + outerRadius * Math.sin(Math.PI * startAngle / 180),
				"A", outerRadius, outerRadius, 0, 0, 1, centerX + outerRadius * Math.cos(Math.PI * endAngle / 180), centerY + outerRadius * Math.sin(Math.PI * endAngle / 180),
				"L", centerX + innerRadius * Math.cos(Math.PI * endAngle / 180), centerY + innerRadius * Math.sin(Math.PI * endAngle / 180),
				"A", innerRadius, innerRadius, 0, 0, 0, centerX + innerRadius * Math.cos(Math.PI * startAngle / 180), centerY + innerRadius * Math.sin(Math.PI * startAngle / 180),
				"Z"
			].join(" ");

			// Set the 'd' attribute to define the shape of the path
			path.setAttribute('d', d);
			
			// Find the group for the current segment
			const currentGroup = findGroupBySegmentId(segmentId);

			// Determine the next segment IDs
			const nextSegmentIdSameRing = sectorIndex < numberOfSectors - 1 ? segmentId + 1 : (segmentIndex * numberOfSectors) + 1;
			const nextSegmentIdNextRing = segmentIndex < segmentsPerSector - 1 ? segmentId + numberOfSectors : null;

			// Find the groups for the next segments
			const nextSegmentGroupSameRing = findGroupBySegmentId(nextSegmentIdSameRing);
			const nextSegmentGroupNextRing = nextSegmentIdNextRing ? findGroupBySegmentId(nextSegmentIdNextRing) : null;

			// Determine if the current segment is an edge segment
			const isEdgeBetweenRings = currentGroup !== nextSegmentGroupNextRing;
			const isEdgeWithinRing = currentGroup !== nextSegmentGroupSameRing;
			const isEdgeOfGroup = isEdgeBetweenRings || isEdgeWithinRing;
			
			// Apply a stroke to the path only if it's on the edge of a group
			path.setAttribute('stroke', isEdgeOfGroup ? 'red' : 'green');
			path.setAttribute('stroke-width', isEdgeOfGroup ? '0' : '0');
			
			// Fill the path with the color of its group, or default if not specified
			path.setAttribute('fill-opacity', '0.1');
			//path.setAttribute('fill', '#333333');
			path.setAttribute('fill', groupColors[currentGroup] || '#FF0000');
			
			// Assign an ID to the path for possible future reference
			path.setAttribute('id', `segment-${segmentId}`);

			// Append the path to the SVG element, adding it to the document
			svg.appendChild(path);
			
			// Increment segment ID
			segmentId++; 
		}
	}
}

// Helper function to find group by segment ID
function findGroupBySegmentId(segmentId) {
	for (const [group, ids] of Object.entries(groups)) {
		if (ids.includes(segmentId)) {
			return group;
		}
	}
	return null;
}

// Define groups by name and their associated segment IDs
const groups = {
	'Sol System': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
	'Akira Sector': [133, 134, 158, 182],
	'Alstrad Sector': [160, 161],
	'Altus Sector': [26, 25, 27, 28, 29, 30],
	'Andromeda Sector': [141, 164, 165],
	'Arturion Sector': [121, 122, 146, 169, 170],
	'Barnard Sector': [31, 32, 33, 34, 35, 56, 57],
	'Borgus Sector': [127, 151],
	'Cancri Sector': [36, 37, 58, 59, 60, 61],
	'Cantolus Sector': [39, 40, 41, 42, 64, 65],
	'Celeste Sector': [51, 52, 53, 54, 77, 78],
	'Draco Sector': [149, 173],
	'Falstaff Sector': [123, 147, 171],
	'Farsight Sector': [176, 200, 201, 224, 225],
	'Ferris Sector': [153, 154, 155],
	'Gallux Sector': [81, 105, 129, 130],
	'Gellert Sector': [193, 216, 239, 240],
	'Gothmar Sector': [38, 62, 63],
	'Guang Sector': [111, 135, 159],
	'Hanzo Sector': [131, 132, 156],
	'Hawking Sector': [194, 217, 218],
	'Hydra Sector': [117, 118, 142],
	'Idun Sector': [43, 66, 67, 90],
	'Iptus Sector': [49, 50, 73, 74, 97, 98],
	'Jin Xi Sector': [150, 174, 175, 199],
	'Kelvin Sector': [44, 45, 46, 47, 48, 68],
	'Korpus Sector': [55, 79, 80, 103],
	'L\'estrade Sector': [195, 196, 197, 219, 220],
	'Lacaille Sector': [166, 167, 143],
	'Leo Sector': [177, 178, 202, 226],
	'Marspira Sector': [69, 70, 93, 94, 95],
	'Meridian Sector': [88, 89, 113],
	'Mirin Sector': [148, 172],
	'Morgon Sector': [82, 83, 106],
	'Nanos Sector': [139, 116, 140],
	'Omega Sector': [157, 181, 204, 205, 229],
	'Orion Sector': [76, 75, 99, 100, 101, 102],
	'Quintus Sector': [184, 185, 208, 232, 233],
	'Rictus Sector': [107, 108, 109, 85, 84],
	'Rigel Sector': [179, 180, 203, 227, 228],
	'Sagan Sector': [92, 91, 115],
	'Saleria Sector': [86, 110, 87],
	'Severin Sector': [209, 210, 234],
	'Sten Sector': [198, 221, 222, 223],
	'Talus Sector': [71, 72, 96, 119, 120],
	'Tanis Sector': [144, 145, 168, 192],
	'Tarragon Sector': [112, 136, 137],
	'Theseus Sector': [114, 138, 162],
	'Trigon Sector': [188, 211, 212, 235],
	'Umlaut Sector': [124, 125, 126],
	'Ursa Sector': [104, 128, 152],
	'Valdis Sector': [190, 191, 214, 215, 238],
	'Xi Tauri Sector': [183, 206, 207, 230, 231],
	'Xzar Sector': [163, 186, 187],
	'Ymir Sector': [189, 213, 236, 237]
};

// Define colors for each group
const groupColors = {
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

