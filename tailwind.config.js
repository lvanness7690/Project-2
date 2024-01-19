module.exports = {
    content: [
      // Assuming tailwind.config.js is in the root directory
      './views/**/*.handlebars',  // Corrected path for Handlebars templates
      './public/js/**/*.js',      // Corrected path for JavaScript files
    ],
    theme: {
      extend: {},
    },
    plugins: [],
};
