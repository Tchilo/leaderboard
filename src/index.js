import './style.css';

const grab = (e, isId = false, qAll = false) => {
  if (isId) {
    return document.getElementById(e);
  } if (qAll) {
    return document.querySelectorAll(`.${e}`);
  }
  return document.querySelector(`.${e}`);
};

const refBtn = grab('ref-btn', true);
const sub = grab('sub', true);
const name = grab('name', true);
const score = grab('score', true);
const ol = grab('list', true);



const refresh = async (gameId) => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
  await fetch(url)
    .then((r) => r.json());
    .then((data) => {
      ol.innerHTML = '';
      const scores = data.result;
      for (let index = 0; index < scores.length; index++) {
        const sco = scores[index];
        const template = document.createElement('template');
        template.innerHTML = `<li>${sco.user}:${sco.score}</li>`;
        ol.appendChild(template.content.firstChild);
      }
    });
};

refBtn.addEventListener('click', async () => {
  if (localStorage.getItem('gameID') === null) {
    await refresh(localStorage.getItem('gameID'))
  }
})

const call = async () => {
  if (localStorage.getItem('gameID') === null) {
    await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'BasketBall',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((respo) => respo.json())
    .then((json) => {
      const str = json.result;
      const slug = str.substr(13, 21);
      localStorage.setItem('gameID', slug);
    });
  } else {
    await refresh(localStorage.getItem('gameID'));
  }
  
}















// sub.addEventListener('click', async (event) => {
//   event.preventDefalt();
//   const nameScore = {};
//   nameScore.user = name.value;
//   nameScore.score = score.value;
//   await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${localStorage.getItem('gameID')}/scores/`, {
//     method: 'POST',
//     body: JSON.stringify(formData),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
// });




// refBtn.addEventListener('click', () => {

// });