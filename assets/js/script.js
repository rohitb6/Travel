'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

// Destination List Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.destination-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const region = button.dataset.region;
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    destinationCards.forEach(card => {
      if (region === 'all' || card.dataset.region === region) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Currency Converter
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertedAmount = document.getElementById('converted-amount');

// Fake exchange rates (for demo purposes)
const exchangeRates = {
  USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, USD: 1.0 },
  EUR: { USD: 1.18, GBP: 0.86, JPY: 129.0, EUR: 1.0 },
  GBP: { USD: 1.37, EUR: 1.16, JPY: 150.0, GBP: 1.0 },
  JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0067, JPY: 1.0 }
};

function convertCurrency() {
  const amount = parseFloat(amountInput.value) || 0;
  const from = fromCurrency.value;
  const to = toCurrency.value;
  
  const rate = exchangeRates[from][to];
  const converted = amount * rate;
  
  convertedAmount.value = converted.toFixed(2);
}

amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

// Trip Countdown
function updateCountdown() {
  const tripDate = new Date('2024-12-31').getTime(); // Example trip date
  const now = new Date().getTime();
  const distance = tripDate - now;
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  
  document.querySelector('.days').textContent = days.toString().padStart(2, '0');
  document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
  document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Travel Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.createElement('div');
modal.className = 'gallery-modal';
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <img src="" alt="Gallery Image">
  </div>
`;

document.body.appendChild(modal);

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.dataset.image;
    modal.querySelector('img').src = imgSrc;
    modal.style.display = 'flex';
  });
});

modal.querySelector('.close-modal').addEventListener('click', () => {
  modal.style.display = 'none';
});

// Budget Tracker
const budgetForm = document.querySelector('.budget-input');
const budgetBreakdown = document.querySelector('.budget-breakdown');
const totalBudget = document.getElementById('total-budget');

let expenses = [];

budgetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const description = budgetForm.querySelector('input[type="text"]').value;
  const amount = parseFloat(budgetForm.querySelector('input[type="number"]').value);
  const category = budgetForm.querySelector('select').value;
  
  expenses.push({ description, amount, category });
  updateBudgetDisplay();
  budgetForm.reset();
});

function updateBudgetDisplay() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalBudget.textContent = total.toFixed(2);
  
  const breakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  
  budgetBreakdown.innerHTML = Object.entries(breakdown)
    .map(([category, amount]) => `
      <div class="breakdown-item">
        <span>${category}:</span>
        <span>$${amount.toFixed(2)}</span>
      </div>
    `).join('');
}

// Language Cheat Sheet
const languageSelect = document.getElementById('language-select');
const phrasesContainer = document.querySelector('.phrases-container');

const phrases = {
  french: [
    { english: 'Hello', translation: 'Bonjour', pronunciation: '/bohn-ZHOOR/' },
    { english: 'Thank you', translation: 'Merci', pronunciation: '/mehr-SEE/' },
    { english: 'Goodbye', translation: 'Au revoir', pronunciation: '/oh ruh-VWAHR/' }
  ],
  spanish: [
    { english: 'Hello', translation: 'Hola', pronunciation: '/OH-lah/' },
    { english: 'Thank you', translation: 'Gracias', pronunciation: '/GRAH-see-ahs/' },
    { english: 'Goodbye', translation: 'Adiós', pronunciation: '/ah-dee-OHS/' }
  ],
  japanese: [
    { english: 'Hello', translation: 'こんにちは', pronunciation: '/kon-nee-chee-wah/' },
    { english: 'Thank you', translation: 'ありがとう', pronunciation: '/ah-ree-gah-toh/' },
    { english: 'Goodbye', translation: 'さようなら', pronunciation: '/sah-yoh-nah-rah/' }
  ],
  italian: [
    { english: 'Hello', translation: 'Ciao', pronunciation: '/chow/' },
    { english: 'Thank you', translation: 'Grazie', pronunciation: '/GRAHT-see-eh/' },
    { english: 'Goodbye', translation: 'Arrivederci', pronunciation: '/ah-ree-veh-DEHR-chee/' }
  ]
};

function updatePhrases() {
  const language = languageSelect.value;
  const languagePhrases = phrases[language];
  
  phrasesContainer.innerHTML = languagePhrases
    .map(phrase => `
      <div class="phrase-card">
        <h4>${phrase.english}</h4>
        <p class="translation">${phrase.translation}</p>
        <p class="pronunciation">${phrase.pronunciation}</p>
      </div>
    `).join('');
}

languageSelect.addEventListener('change', updatePhrases);
updatePhrases();

// Itinerary Board Drag and Drop
const dayPlans = document.getElementById('sortable');
const plans = document.querySelectorAll('.day-plan');

plans.forEach(plan => {
  plan.addEventListener('dragstart', () => {
    plan.classList.add('dragging');
  });
  
  plan.addEventListener('dragend', () => {
    plan.classList.remove('dragging');
  });
});

dayPlans.addEventListener('dragover', e => {
  e.preventDefault();
  const draggingPlan = document.querySelector('.dragging');
  const siblings = [...dayPlans.querySelectorAll('.day-plan:not(.dragging)')];
  
  const nextSibling = siblings.find(sibling => {
    const box = sibling.getBoundingClientRect();
    const offset = e.clientY - box.top - box.height / 2;
    return offset < 0;
  });
  
  dayPlans.insertBefore(draggingPlan, nextSibling);
});

// Airport Navigation
const gateSearch = document.querySelector('.gate-filter input');
const terminalSelect = document.querySelector('.gate-filter select');

// Simulated gate data
const gates = [
  { number: 'A1', terminal: 't1', status: 'Boarding' },
  { number: 'A2', terminal: 't1', status: 'Delayed' },
  { number: 'B1', terminal: 't2', status: 'On Time' },
  { number: 'B2', terminal: 't2', status: 'Cancelled' }
];

function updateGateDisplay() {
  const searchTerm = gateSearch.value.toLowerCase();
  const selectedTerminal = terminalSelect.value;
  
  const filteredGates = gates.filter(gate => {
    const matchesSearch = gate.number.toLowerCase().includes(searchTerm);
    const matchesTerminal = selectedTerminal === 'all' || gate.terminal === selectedTerminal;
    return matchesSearch && matchesTerminal;
  });
  
  // Update airport map with filtered gates
  // This would be implemented with actual map visualization
}

gateSearch.addEventListener('input', updateGateDisplay);
terminalSelect.addEventListener('change', updateGateDisplay);

// Moodboard Builder
const stickerPalette = document.querySelector('.sticker-palette');
const moodboardCanvas = document.querySelector('.moodboard-canvas');
const stickers = document.querySelectorAll('.sticker');

stickers.forEach(sticker => {
  sticker.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', sticker.textContent);
  });
});

moodboardCanvas.addEventListener('dragover', e => {
  e.preventDefault();
});

moodboardCanvas.addEventListener('drop', e => {
  e.preventDefault();
  const emoji = e.dataTransfer.getData('text/plain');
  
  const newSticker = document.createElement('div');
  newSticker.className = 'sticker';
  newSticker.textContent = emoji;
  newSticker.style.position = 'absolute';
  newSticker.style.left = `${e.offsetX}px`;
  newSticker.style.top = `${e.offsetY}px`;
  
  moodboardCanvas.appendChild(newSticker);
});

// Add CSS for gallery modal
const style = document.createElement('style');
style.textContent = `
  .gallery-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
  }
  
  .modal-content img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
  }
  
  .close-modal {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }
  
  .dragging {
    opacity: 0.5;
  }
`;

document.head.appendChild(style);

// Initialize planner hover images
document.addEventListener('DOMContentLoaded', function() {
  const plannerDays = document.querySelectorAll('.planner-day');
  
  plannerDays.forEach(day => {
    const imagePath = day.getAttribute('data-image');
    const hoverImage = day.querySelector('.planner-hover-image');
    
    if (hoverImage && imagePath) {
      hoverImage.style.backgroundImage = `url('${imagePath}')`;
    }
  });
});

// Save planner notes to local storage
const plannerDays = document.querySelectorAll('.planner-day');
plannerDays.forEach(day => {
  const textarea = day.querySelector('textarea');
  const dayNumber = day.querySelector('h4').textContent;
  
  // Load saved notes
  const savedNotes = localStorage.getItem(`planner-${dayNumber}`);
  if (savedNotes) {
    textarea.value = savedNotes;
  }
  
  // Save notes on input
  textarea.addEventListener('input', () => {
    localStorage.setItem(`planner-${dayNumber}`, textarea.value);
  });
});

// Weather information for destinations
const weatherAPIKey = 'YOUR_API_KEY'; // Replace with actual API key
const weatherContainer = document.createElement('div');
weatherContainer.className = 'weather-info';
document.querySelector('.destination-list').appendChild(weatherContainer);

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`);
    const data = await response.json();
    return {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

// Add weather info to destination cards
document.querySelectorAll('.destination-card').forEach(async card => {
  const city = card.querySelector('h3').textContent;
  const weather = await getWeather(city);
  if (weather) {
    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';
    weatherInfo.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}">
      <span>${weather.temp}°C</span>
      <span>${weather.description}</span>
    `;
    card.querySelector('.destination-info').appendChild(weatherInfo);
  }
});

// Interactive map for destinations
function initMap() {
  const mapContainer = document.createElement('div');
  mapContainer.id = 'destination-map';
  mapContainer.style.height = '400px';
  document.querySelector('.destination-list').appendChild(mapContainer);

  const map = new google.maps.Map(mapContainer, {
    zoom: 2,
    center: { lat: 0, lng: 0 }
  });

  // Add markers for each destination
  document.querySelectorAll('.destination-card').forEach(card => {
    const city = card.querySelector('h3').textContent;
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: city }, (results, status) => {
      if (status === 'OK') {
        const marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          title: city
        });

        // Add click event to show info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="map-info-window">
              <h3>${city}</h3>
              <p>${card.querySelector('p').textContent}</p>
              <div class="destination-info">
                ${card.querySelector('.destination-info').innerHTML}
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    });
  });
}

// Add drag and drop for itinerary items
const itineraryItems = document.querySelectorAll('.day-plan');
itineraryItems.forEach(item => {
  item.setAttribute('draggable', true);
  
  item.addEventListener('dragstart', () => {
    item.classList.add('dragging');
  });
  
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
  });
});

// Add sorting functionality to itinerary
const itineraryContainer = document.querySelector('.day-plans');
itineraryContainer.addEventListener('dragover', e => {
  e.preventDefault();
  const draggingItem = document.querySelector('.dragging');
  const siblings = [...itineraryContainer.querySelectorAll('.day-plan:not(.dragging)')];
  
  const nextSibling = siblings.find(sibling => {
    const box = sibling.getBoundingClientRect();
    const offset = e.clientY - box.top - box.height / 2;
    return offset < 0;
  });
  
  itineraryContainer.insertBefore(draggingItem, nextSibling);
});

// Add search functionality to destination list
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search destinations...';
searchInput.className = 'destination-search';
document.querySelector('.filter-container').prepend(searchInput);

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  document.querySelectorAll('.destination-card').forEach(card => {
    const city = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    const isVisible = city.includes(searchTerm) || description.includes(searchTerm);
    card.style.display = isVisible ? 'block' : 'none';
  });
});

// Add favorite destinations feature
document.querySelectorAll('.destination-card').forEach(card => {
  const favoriteBtn = document.createElement('button');
  favoriteBtn.className = 'favorite-btn';
  favoriteBtn.innerHTML = '♡';
  card.appendChild(favoriteBtn);
  
  favoriteBtn.addEventListener('click', () => {
    const isFavorite = favoriteBtn.classList.toggle('active');
    favoriteBtn.innerHTML = isFavorite ? '♥' : '♡';
    
    // Save to local storage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const city = card.querySelector('h3').textContent;
    
    if (isFavorite) {
      favorites.push(city);
    } else {
      const index = favorites.indexOf(city);
      if (index > -1) favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
});