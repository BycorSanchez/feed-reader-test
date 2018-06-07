/* feedreader.js
 *
 * Spec file that contain all tests that Jasmine will run against our application.
 * The $() function ensures that tests don't run until the DOM is ready.
 */
$(function () {

    // RSS feed suite
    describe('RSS Feeds', function () {

        // Test that allFeeds variable is defined and has at least 1 value
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test that no feed has an empty URL
        it('have URLs defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        // Test that no feed has an empty name
        it('have names defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });

    // The menu suite
    describe('The menu', function () {
        const body = document.body;
        const menu = document.querySelector(".menu-icon-link");

        // Test the menu to be hidden by default
        it('is hidden by default', function () {
            // CSS class 'menu-hidden' is used to hide the menu, so it should be present
            expect(body.className).toContain('menu-hidden');
        });

        // Test that menu visibility changes every time it's clicked
        it('changes visibility on click', function () {
            // Since it's hidden by default, a click should make it visible (no 'menu-hidden' class is present)
            menu.click();
            expect(body.className).not.toContain('menu-hidden');

            // A second click should hide it ('menu-hidden' class is present)
            menu.click();
            expect(body.className).toContain('menu-hidden');
        });

    });

    // Initial entries suite
    describe('Initial Entries', function () {

        /* loadFeed() function is asynchronous so these tests require
         * the use of beforeEach and the asynchronous done() function
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Test that loadFeed() loads at least a single .entry element within the .feed container
        it('have at least 1 feed when loaded', function (done) {
            const entries = document.querySelectorAll('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });

    });

    // New feed selection suite
    describe('New Feed Selection', function () {

        let initialFeed;

        // Load two different feeds
        beforeEach(function (done) {
            loadFeed(0, function () {
                // Store initial feed to compare it afterwards
                initialFeed = document.querySelector(".feed").innerHTML;

                // Load second feed content
                loadFeed(1, done);
            });
        });

        // Make sure that the content has changed when loading a new feed
        it("content changes according to feed", function (done) {
            var currentFeed = document.querySelector(".feed").innerHTML;
            expect(initialFeed).not.toBe(currentFeed);
            done();
        });

    });

}());
