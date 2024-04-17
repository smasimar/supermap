// This will hold the selected segment IDs
let selectedSegments = new Set();

document.addEventListener('DOMContentLoaded', () => {
    // Wait until the SVG is drawn
    attachEventListeners();
});

function attachEventListeners() {
    const segments = document.querySelectorAll('path');
    segments.forEach(segment => {
        segment.addEventListener('click', function() {
            toggleSegmentSelection(this);
        });
    });
}

function toggleSegmentSelection(segment) {
    // Get the full ID of the segment
    const fullId = segment.getAttribute('id');
    // Extract the numeric part of the ID using regex
    const idMatch = fullId.match(/segment-(\d+)/);
    const id = idMatch ? idMatch[1] : null;

    if (id && selectedSegments.has(id)) {
        selectedSegments.delete(id);
        segment.classList.remove('selected');
    } else if (id) {
        selectedSegments.add(id);
        segment.classList.add('selected');
    }

    // Log only the numbers of the selected segments
    console.log(Array.from(selectedSegments).map(Number));
}

// Include some basic styling for the selected class
const style = document.createElement('style');
style.textContent = `
    .selected {
        fill: #cccccc; /* or any color to indicate selection */
        stroke: #222222; /* or any color to make the selection more visible */
    }
`;
document.head.appendChild(style);