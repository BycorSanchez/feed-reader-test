/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    // RSS feed tests
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
                expect(feed.url).not.toBe('');
            });
        });

        // Test that no feed has an empty name
        it('have names defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    // The menu tests
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

    // Initial Entries tests
    describe('Initial Entries', function () {

        /* loadFeed() function is asynchronous so these tests require
         * the use of beforeEach and the asynchronous done() function
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Test that loadFeed() loads at least a single .entry element within the .feed container
        it('have at least 1 feed after loadFeed() is called', function (done) {
            const entries = document.querySelector('.feed').getElementsByClassName('.entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });

    });

}());
