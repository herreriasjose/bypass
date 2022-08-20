
const images = document.getElementsByTagName('img');
const imagesFiltered = [...images].map((image) => { return  { currentSrc: image.currentSrc, height: image.naturalHeight, with: image.naturalWidth }});

console.log('>>> images found:', imagesFiltered);