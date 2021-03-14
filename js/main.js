
const app = new Vue({
	el: '#app',
	data: {
		inp1: '',
		inp2: '', // inp2 is used for longitude if it is chosen
		getWeatherMap: false,
		weatherMap: null,
		WEATHER_API_KEY: '[YOU_WEATHER_API_KEY]',
		weatherData: null,
		getWeatherBy: { text: 'Zip Code', value: 'zip' },
		getByOptions: [
			{ text: 'City,State', value: 'cityState' },
			{ text: 'Zip Code', value: 'zip' },
			{ text: 'GPS', value: 'gps' },
		],
	},
    components: {
        'google-map': GoogleMap
      },
	methods: {
		setGetByWeatherType(option) {
			this.getWeatherBy = option;
		},
		deleteWeatherData() {
			this.weatherData = null;
			this.clearInput();
		},
		clearInput() {
			this.inp1 = '';
			this.inp2 = '';
		},
		getWeatherData() {
			// Return if not valid input
			if (!this.isValidInput()) {
				return alert('Invalid Input');
			}
			const url = this.getUrl(
				this.getWeatherBy.value,
				this.inp1,
				this.inp2
			);
			fetch(url)
				.then(res => res.json())
			 	.then(this.handleSuccess)
			 	.catch(this.handleError);
		},
		getCurrentLocation() {
			navigator.geolocation.getCurrentPosition(
				this.onLocationSuccess,
				this.handleError,
				{
					enableHighAccuracy: true,
					timeout: 30000,
				}
			);
		},
		onLocationSuccess(res) {
			const url = this.getUrl(
				'gps',
				res.coords.latitude,
				res.coords.longitude
			);
			fetch(url)
				.then(res => res.json())
			 	.then(this.handleSuccess)
			 	.catch(this.handleError);
		},
		handleSuccess(res) {
			if (res.cod === '404') {
				throw new Error('Location not found');
			}
			this.weatherData = res;
		},
		handleError(err) {
			console.error('ERROR', err);
			alert('Unable to fetch weather data.');
		},
		getUrl(value, inp1, inp2) {
			let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${this.WEATHER_API_KEY}&units=imperial&`;
			switch (value) {
				case 'zip':
					apiUrl += `zip=${encodeURI(inp1)}`;
					break;
				case 'cityState':
					apiUrl += `q=${encodeURI(inp1)}`;
					break;
				case 'gps':
					apiUrl += `lat=${encodeURI(inp1)}&lon=${encodeURI(inp2)}`;
					break;
			}
			return apiUrl;
		},
		isValidInput() {
			if (this.getWeatherBy.value === 'gps') {
				return this.inp1.length && this.inp2.length;
			}
			return !!this.inp1.length;
		},
	},
});
