const APIKey = '11f2ff5a50fcce4df43aa4c897d132d3f5ad4a84ed0aec7be67718deb5120192';

fetch(`https://api.unsplash.com/search/photos?query=Adelaide&per_page=50&client_id=${APIKey}`).
then(request => request.json()).
then(data => {
  for (let image of data.results) {

    let { width, height } = image;
    let imageURL = image.urls.regular;

    if (width > height)
    document.querySelector('.grid').innerHTML += `<div class="image"><img src="${imageURL}"></div>`;
  }
});