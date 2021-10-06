const grab = (e) => document.getElementById(e);

const refBtn = grab('ref-btn');
const ol = grab('list');

const refresh = async (gameID) => {
  fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`)
    .then((response) => response.json())
    .then((data) => {
      ol.innerHTML = '';
      const scores = data.result;
      for (let index = 0; index < scores.length; index++) {
        const element = scores[index];
        const template = document.createElement('template');
        template.innerHTML = `<li>${element.user}:${element.score}</li>`;
        ol.appendChild(template.content.firstChild);
      }
    });
};

refBtn.addEventListener('click', async () => {
  if (localStorage.getItem('gameID') !== null) {
    await refresh(localStorage.getItem('gameID'));
  }
});

const init = async () => {
  if (localStorage.getItem('gameID') === null) {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',{
        method: 'POST',
        body: JSON.stringify({
          name: 'Formula1'
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('gameID',JSON.stringify(data))
    } )
    } else {
      await refresh(localStorage.getItem('gameID'));
    }