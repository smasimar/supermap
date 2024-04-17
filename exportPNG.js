document.getElementById('ExportPNGButton').addEventListener('click', function() {
    exportPNG();
});

function exportPNG() {
    const svgElement = document.getElementById('svgOverlay').querySelector('svg');
    const imageElement = document.querySelector('.overlay-image');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to match the image
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;

    // Draw the image onto the canvas
    ctx.drawImage(imageElement, 0, 0);

    // Convert SVG to a data URL
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    // Create an image to load the SVG data
    const svgImage = new Image();

    svgImage.onload = function() {
        // Draw the SVG image onto the canvas
        ctx.drawImage(svgImage, 0, 0);

        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL('image/png');

        // Create a download link and click it to download the image
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'composite_image.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        URL.revokeObjectURL(url); // Clean up URL
    };

    svgImage.src = url; // Start loading the SVG data
}
