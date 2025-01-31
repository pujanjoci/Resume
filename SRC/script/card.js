const blocks = document.querySelectorAll('.testimonials-main .testimonials-section .section .block');

let currentDrag = null;  // Track the currently dragged element

blocks.forEach((block) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    block.addEventListener('mousedown', (e) => {
        if (currentDrag !== null) return;  // Prevent dragging if another card is already being dragged

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        currentDrag = block;  // Set the dragged card

        // Add dragging class and adjust z-index and opacity
        block.classList.add('dragging');
        block.style.zIndex = 1000;  // Make sure it's on top
        block.style.opacity = 0.8;  // Slightly transparent while dragging
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        block.style.transform = `translate(${dx}px, ${dy}px)`;  // Move the block with the cursor

        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            block.classList.remove('dragging');  // Remove dragging class
            block.style.transform = 'none';  // Reset the position

            // Reset z-index and opacity after the drag ends
            block.style.zIndex = 10;
            block.style.opacity = 1;

            currentDrag = null;  // Reset the current drag element
        }
    });
});
