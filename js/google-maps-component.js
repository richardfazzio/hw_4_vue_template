const GoogleMap = Vue.extend({
    template: `<iframe :src="src" :height="height" :width="width" :zoom="zoom" title="Google Map"></iframe>`,
    props: {
        // Required props
        lat: Number,
        lon: Number,
        // Default values for height + width + zoom, can overwrite if passed as props.
        zoom: {
            default: 12,
            type: Number
          },
        height: {
            default: 350,
            type: Number
          },
        width: {
            default: 350,
            type: Number
          }
    },
    data() {
        return {
            API_KEY: 'YOUR_GOOGLE_API_KEY' //PUT YOUR API KEY HERE
        }
    },
    computed: {
        src() {
            return `https://www.google.com/maps/embed/v1/view?key=${this.API_KEY}&center=${this.lat},${this.lon}&zoom=${this.zoom}`;
        }
    },
    // Function is executed when this vue component is initialized
    created() {
        console.log('Google Map created!');
    }
  });