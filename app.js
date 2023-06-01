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
    const rows = response['results'];
    movieList(rows);
  })
  .catch((err) => console.error(err));

//카드 생성 함수
function movieList(rows) {
  rows.forEach((a, index) => {
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

//검색 기능
function searchMovie() {
  let input = document.getElementById('search').value.toLowerCase(); //검색한 값
  let title = document.getElementsByClassName('card-title'); //모든 영화 제목 HTML 가져오기, HTMLCollection
  let num = 0;
  console.log(title);
  let card = document.querySelectorAll('.movie-list');
  console.log(card);
  card.forEach((a) => {
    console.log(a);
  });
  let titleArray = array(title);

  // HTMLCollection 객체를 배열로 반환
  function array(x) {
    let array = [];
    for (const a of x) {
      let title = a.innerText.toLowerCase();
      array.push(title);
    }
    return array;
  }

  //검색한 값이 포함된 영화 제목이 있으면 display
  titleArray.forEach((a) => {
    if (a.includes(input)) {
      document.getElementById(`${num}`).setAttribute('style', 'display');
      num++;
    } else {
      document.getElementById(`${num}`).setAttribute('style', 'display:none');
      num++;
    }
  });

  //검색한 값이 포함된 영화가 없을 경우 alert
  if (titleArray.find((a) => a.includes(input)) == undefined) {
    alert('검색하신 영화가 없습니다!');
  }
}

//검색 버튼
document.getElementById('btn').addEventListener('submit', searchMovie);

let alertId = (a) => {
  alert(`영화 id : ${a}`);
};
