// global-teardown.js

module.exports = async () => {
    if (global.__BROWSER__) {
        await global.__BROWSER__.close(); // Ensure you're calling close on the global browser instance
    }
};
