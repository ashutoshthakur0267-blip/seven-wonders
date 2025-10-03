// Data for the seven wonders (images use Wikimedia 'Special:FilePath' redirect)
const monuments = [
  {
    id: 'taj',
    name: 'Taj Mahal',
    country: 'India',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal_2012.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Taj_Mahal_2012.jpg',
    desc: 'A white marble mausoleum in Agra built by Mughal emperor Shah Jahan in memory of Mumtaz Mahal (completed in 1653).'
  },
  {
    id: 'greatwall',
    name: 'Great Wall of China',
    country: 'China',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/THE_GREAT_WALL_OF_CHINA.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:THE_GREAT_WALL_OF_CHINA.jpg',
    desc: 'A series of fortifications built across northern China, constructed and rebuilt between the 7th century BC and the 16th century to protect Chinese states.'
  },
  {
    id: 'petra',
    name: 'Petra',
    country: 'Jordan',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Treasury%2C_Petra%2C_Jordan5.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:The_Treasury,_Petra,_Jordan5.jpg',
    desc: 'An archaeological city carved into red-pink sandstone cliffs; famed for its rock-cut architecture and water conduit system.'
  },
  {
    id: 'machu',
    name: 'Machu Picchu',
    country: 'Peru',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Machu-Picchu.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Machu-Picchu.jpg',
    desc: 'An Inca citadel set high in the Andes Mountains, renowned for its dry-stone walls and panoramic terraces.'
  },
  {
    id: 'christ',
    name: 'Christ the Redeemer',
    country: 'Brazil',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Christ_the_Redeemer_-_Cristo_Redentor.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Christ_the_Redeemer_-_Cristo_Redentor.jpg',
    desc: 'An Art Deco statue of Jesus Christ in Rio de Janeiro, standing atop the Corcovado mountain.'
  },
  {
    id: 'colosseum',
    name: 'Colosseum',
    country: 'Italy',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Colosseo_2020.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Colosseo_2020.jpg',
    desc: 'Also known as the Flavian Amphitheatre in Rome — a massive amphitheatre dating to the Roman Empire used for public spectacles.'
  },
  {
    id: 'chichen',
    name: 'Chichén Itzá',
    country: 'Mexico',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chichen_Itza_3.jpg',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Chichen_Itza_3.jpg',
    desc: 'A large pre-Columbian archaeological site built by the Maya in the Yucatán Peninsula, famous for the pyramid known as El Castillo.'
  }
];

// DOM refs
const grid = document.getElementById('card-grid');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDesc = document.getElementById('modalDesc');
const modalMeta = document.getElementById('modalMeta');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

// Build cards
function buildCards(){
  monuments.forEach(m => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img loading="lazy" src="${m.image}" alt="${m.name} photo" />
      <div class="card-body">
        <h3 class="card-title">${m.name}</h3>
        <p class="card-sub">${m.country}</p>
      </div>
      <div class="card-footer">
        <button class="btn" data-id="${m.id}">Learn More</button>
        <a class="muted-link" href="${m.sourcePage}" target="_blank" rel="noopener noreferrer" title="Image source">Source ↗</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Modal handlers
function openModal(monument){
  modal.setAttribute('aria-hidden','false');
  modalTitle.textContent = monument.name;
  modalImage.src = monument.image;
  modalImage.alt = monument.name + ' image';
  modalDesc.textContent = monument.desc;
  modalMeta.innerHTML = `<strong>Country:</strong> ${monument.country} · <a href="${monument.sourcePage}" target="_blank" rel="noopener noreferrer">Image source</a>`;
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalImage.src = '';
  document.body.style.overflow = '';
}

// Event delegation for cards
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id]');
  if(!btn) return;
  const id = btn.dataset.id;
  const monument = monuments.find(m => m.id === id);
  if(monument) openModal(monument);
});

// Modal close interactions
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

// Init
buildCards();
