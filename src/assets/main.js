const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC7QoKU6bj1QbXQuNIjan82Q&part=snippet%2Cid&order=date&maxResults=9'
const content = null || document.querySelector('#content')


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '747be6c6e0msh7e2183218542cbbp1e4682jsncb33cbcc42c3',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options)
  const data = response.json()
  return data
}

// Immediately invoked function expression (IIFE)
(async () => {
  try {
    const videos = await fetchData(API)
    console.log(videos)
    // creating HTML5 template
    let view = `
      ${videos.items.map(video => `
        <a href="https://youtube.com/watch?v=${video.id.videoId}"target="_blank">
          <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
              </h3>
            </div>
          </div>
        </a>
      `).slice(0, 4).join('')}
    `
    content.innerHTML = view

  } catch (error){
    alert('la API ha sufrido un error')
    console.log(error)
  }
})();