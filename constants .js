// Array of image URLs
const imageUrls = [
    'url("/img/ocean.jpg")',
    'url("/img/1.jpg")',
    'url("/img/2.jpg")',
    'url("/img/3.jpg")',
    'url("/img/4.jpg")',
    'url("/img/5.jpg")',
    'url("/img/6.jpg")',
    'url("/img/7.jpg")'
    // Add more image URLs as needed
  ];
  
  // Function to set a random background image
  function setRandomBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    document.body.style.backgroundImage = imageUrls[randomIndex];
  }
  
  // Call the function to set a random background image on page load
  setRandomBackgroundImage();