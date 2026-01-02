const input = document.querySelector('.input');
const reveal = document.querySelector('.reveal');

function animate(text) {
  reveal.innerHTML = text.trim().split(/\s+/).map(w => `<span>${w}</span>`).join('');
}

input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && input.value.trim()) {
    animate(input.value);
    input.value = '';
  }
});

animate('Type anything and press Enter');