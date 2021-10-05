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

sub.addEventListener('click', () => {
  alert(name.value, score.value);
});




refBtn.addEventListener('click', () => {

});