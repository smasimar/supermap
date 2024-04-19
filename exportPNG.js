document.getElementById('exportPNGButton').addEventListener('click', function() {
    const imageUrl = 'Galactic_Frontier_Template.png'; // Adjust this path
    const svgElement = document.getElementById('svgOverlay').querySelector('svg');
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgElement);

    // Create a new Image object
    const img = new Image();
    img.src = imageUrl;
    img.onload = function() {
        // Create a canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        // Draw the image
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Create an image from the SVG
        const svgBlob = new Blob([svgStr], {type: "image/svg+xml;charset=utf-8"});
        const DOMURL = window.URL || window.webkitURL || window;
        const url = DOMURL.createObjectURL(svgBlob);
        
        const svgImg = new Image();
        svgImg.onload = function () {
            // Draw the SVG on top of the image
            ctx.drawImage(svgImg, 0, 0, img.width, img.height);
            
            // Save the canvas as an image
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'composite_image.png';
            link.href = dataUrl;
            link.click();
            DOMURL.revokeObjectURL(url);
        };
        svgImg.src = url;
    };
});
