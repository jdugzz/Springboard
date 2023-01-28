// Selecting HTML elements
const gifArea = document.getElementById('gif-area');
const searchInput = document.getElementById('search');

// Function to add a gif to the page
function addGif(gifs) {
  // Check if there are any gifs in the response
  if (gifs.length > 0) {
    // Select a random gif
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    // Create a new div
    const newDiv = document.createElement('div');
    newDiv.classList.add('col-md-4', 'col-12', 'mb-4');
    // Create a new image element
    const newImg = document.createElement('img');
    newImg.src = randomGif.images.original.url;
    newImg.classList.add('w-100');
    // Add the image to the new div
    newDiv.appendChild(newImg);
    // Add the div to the gif area
    gifArea.appendChild(newDiv);
  }
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value;
  searchInput.value = '';

  // Make a GET request to the Giphy API
  const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      q: searchTerm,
      api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym',
    },
  });

  // Add the gif to the page
  addGif(response.data.data);
});

// Event listener to remove gifs
document.getElementById('remove').addEventListener('click', () => {
  gifArea.innerHTML = '';
});
