const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2JmMWFmMTgxZTE0ODI2NjNhMDgwZmY2ZTczNzQwZiIsInN1YiI6IjY0NzA5NGZmNzcwNzAwMDBkZjEzZTMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x--BJcGWKnImQj4Gm0kV40mRM1hNvK4aitCRs_v9fDg',
  },
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then((response) => response.json())
  .then((response) => {
    let rows = response['results'];
    movieList(rows);
  })
  .catch((err) => console.error(err));

// async function fetchMovie() {
//   let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
//   let data = await response.json();
//   // return await data['results'];
//   console.log(data['results']);
// }

function movieList(rows) {
  rows.map((a) => {
    const temp = document.createElement('div');
    temp.innerHTML = `<div id="box" onclick="alertId(${a['id']})" style="cursor:pointer;" >
    <div class='card'>
                      <img
                      src="https://image.tmdb.org/t/p/w500${a['poster_path']}">
                      <div class='card-title'>${a['title']}</div>
                      <p class='card-overview'>${a['overview']}</p>
                      <p>${a['vote_average']}</p>
                      </div>
                      </div>`;
    document.querySelector('.movie-list').append(temp);
  });
}

function searchMovie() {
  const div = document.querySelector('.movie-list');
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  let input = document.getElementById('search').value;

  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then((response) => response.json())
    .then((response) => {
      let rows = response['results'];

      rows.forEach((a) => {
        let lowerTitle = a['title'].toLowerCase();
        let lowerInput = input.toLowerCase();
        if (lowerTitle.includes(lowerInput)) {
          const temp = document.createElement('div');
          temp.innerHTML = `<div id="box" onclick="alertId(${a['id']})" style="cursor:pointer;">
                            <div class='card'>
                            <img
                            src="https://image.tmdb.org/t/p/w500${a['poster_path']}">
                            <div class='card-title'>${a['title']}</div>
                            <p class='card-overview'>${a['overview']}</p>
                            <p>${a['vote_average']}</p>
                            </div>
                            </div>`;
          document.querySelector('.movie-list').append(temp);
        }
      });
    });
}

let alertId = (a) => {
  alert(`영화 id : ${a}`);
};

let enterKey = () => {
  if (window.event.keyCode == 13) {
    searchMovie();
  }
};
