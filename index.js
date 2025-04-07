
// Image data - replace with your own images
const images = [
    './images/download1.jpeg',
    './images/download2.jpeg',
    './images/download3.jpeg',
    './images/download4.jpeg',
    './images/download5.jpeg',
    './images/download6.jpeg'
];

let currentIndex = 0;
const activeImage = document.getElementById('active-image');
const thumbnailContainer = document.getElementById('thumbnail-container');

// Initialize the gallery
function initGallery() {
    // Set first image as active
    if (images.length > 0) {
        updateActiveImage(currentIndex);
        
        // Create thumbnails
        images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.className = 'thumbnail' + (index === currentIndex ? ' active' : '');
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.dataset.index = index;
            thumbnail.addEventListener('click', () => setActiveImage(index));
            thumbnailContainer.appendChild(thumbnail);
        });
    }
}

// Update active image display
function updateActiveImage(index) {
    activeImage.style.opacity = 0;
    setTimeout(() => {
        activeImage.src = images[index];
        activeImage.alt = `Active image ${index + 1}`;
        activeImage.style.opacity = 1;
    }, 300);
}

// Set active image by index
function setActiveImage(index) {
    if (index >= 0 && index < images.length) {
        currentIndex = index;
        updateActiveImage(index);
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Scroll thumbnail into view
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
}

// Navigation functions
function nextImage() {
    const nextIndex = (currentIndex + 1) % images.length;
    setActiveImage(nextIndex);
}

function prevImage() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setActiveImage(prevIndex);
}

// Event listeners
document.querySelector('.next').addEventListener('click', nextImage);
document.querySelector('.prev').addEventListener('click', prevImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Initialize the gallery when page loads
document.addEventListener('DOMContentLoaded', initGallery);