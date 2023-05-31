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

function movieList(rows) {
  rows.map((a, index) => {
    const temp = document.createElement('div');
    temp.setAttribute('class', 'movie-list');
    temp.setAttribute('id', `${index}`);
    temp.innerHTML = `<div id="box" onclick="alertId(${a['id']})" style="cursor:pointer;" >
                      <img
                      src="https://image.tmdb.org/t/p/w500${a['poster_path']}">
                      <div class='card-title'>${a['title']}</div>
                      <p class='card-overview'>${a['overview']}</p>
                      <p>${a['vote_average']}</p>
                      </div>`;
    document.querySelector('.list').append(temp);
  });
}

function searchMovie() {
  let input = document.getElementById('search').value.toLowerCase(); //검색한 값
  let cardTitle = document.getElementsByClassName('card-title'); //모든 영화 제목 HTML 가져오기
  let num = 0;
  let titleArray = array(cardTitle);

  function array(x) {
    let array = [];
    for (const a of x) {
      let title = a.innerText.toLowerCase();
      array.push(title);
    }
    return array;
  }

  titleArray.forEach((a) => {
    if (a.includes(input)) {
      document.getElementById(`${num}`).setAttribute('style', 'display');
      num++;
    } else {
      document.getElementById(`${num}`).setAttribute('style', 'display:none');
      num++;
    }
  });

  if (titleArray.find((a) => a.includes(input)) == undefined) {
    alert('검색하신 영화가 없습니다!');
  }
}

document.getElementById('btn').addEventListener('click', searchMovie);

let alertId = (a) => {
  alert(`영화 id : ${a}`);
};

let enterKey = (e) => {
  if (e.code === 'Enter') {
    searchMovie();
  }
};
