// ┬ ┬┌─┐┌─┐┌┬┐┬ ┬┌─┐┬─┐
// │││├┤ ├─┤ │ ├─┤├┤ ├┬┘
// └┴┘└─┘┴ ┴ ┴ ┴ ┴└─┘┴└─
// Functions to setup Weather widget.

const iconElement = document.getElementById('weatherIcon');
const tempElement = document.getElementById('weatherValue');
const descElement = document.getElementById('weatherDescription');
const locationElement = document.getElementById('weatherLocation');

const weather = {
	temperature: { unit: 'celsius' },
	location: '',
	updateWeather: function() {
		setPosition();
	}
};

// Exposer l'objet weather globalement pour les autres scripts
window.weather = weather;

var tempUnit = CONFIG.weatherUnit;

const KELVIN = 273.15;
const key = `${CONFIG.weatherKey}`;

// Initialiser la météo
setPosition();

function setPosition(position) {
	if (!CONFIG.trackLocation || !navigator.geolocation) {
		if (CONFIG.trackLocation) {
			console.error('Geolocation not available');
		}
		getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
		return;
	}
	navigator.geolocation.getCurrentPosition(
		pos => {
			getWeather(pos.coords.latitude.toFixed(3), pos.coords.longitude.toFixed(3));
		},
		err => {
			console.error(err);
			getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
		}
	);
}

function getWeather(latitude, longitude) {
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${CONFIG.language}&appid=${key}`;
	fetch(api)
		.then(function(response) {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(function(data) {
			let celsius = Math.floor(data.main.temp - KELVIN);
			weather.temperature.value = tempUnit == 'C' ? celsius : (celsius * 9) / 5 + 32;
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;
			weather.location = data.name + ', ' + data.sys.country;
			displayWeather();
		})
		.catch(function(error) {
			console.error('Erreur lors de la récupération de la météo:', error);
			// Afficher un message d'erreur à l'utilisateur
			if (tempElement) tempElement.innerHTML = 'N/A';
			if (descElement) descElement.innerHTML = 'Météo indisponible';
			if (locationElement) locationElement.innerHTML = 'Localisation inconnue';
		});
}

function displayWeather() {
	if (iconElement && weather.iconId) {
		iconElement.innerHTML = `<img src="assets/icons/${CONFIG.weatherIcons}/${weather.iconId}.png" alt="${weather.description}"/>`;
	}
	if (tempElement && weather.temperature.value !== undefined) {
		tempElement.innerHTML = `${weather.temperature.value.toFixed(0)}°<span class="darkfg">${tempUnit}</span>`;
	}
	if (descElement && weather.description) {
		descElement.innerHTML = weather.description;
	}
	if (locationElement && weather.location) {
		locationElement.innerHTML = weather.location;
	}
}
