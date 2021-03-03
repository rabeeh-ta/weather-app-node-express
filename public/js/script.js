console.log('hola ');

const weatherFrom = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherFrom.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'loading...';
  messageTwo.textContent = '';
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageTwo.textContent = data.error;
        messageOne.textContent = '';
      } else {
        // console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
