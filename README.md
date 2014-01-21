lifequote
=========

A port of an existing Flash-based life insurance quick quoting application to a
single-page JavaScript app, built with (and to learn)
[React](http://facebook.github.io/react/).

[Node.js](http://nodejs.org) is required to build lifequote and run its dev
server.

Dev Server
----------

A dev server is provided to serve up lifequote from the `/public` directory and
provide a basic implementation of the API lifequote calls.

Use Node.js' package manager - `npm` - to install runtime dependencies and start
the dev server:

    npm install --production
    npm start

Useful dev server URLS:

* Start: <http://127.0.0.1:3000?zipCode=12345>
* Check API cache: <http://127.0.0.1:3000/api/cache>
* Clear API cache: <http://127.0.0.1:3000/api/cache/clear>

### Poxy Proxy? ###

An easter-egg for anyone behind an NTLM proxy which just made their
`npm install` experience not go so well - make sure npm is configured to use
your proxy and to hit the HTTP version of its registry:

    npm config set proxy <your proxy here>
    npm config set registry http://registry.npmjs.org

Development
-----------

### Modules ###

Source modules live under `/src` - any directory layout may be used within
`/src`, but each module within it must have a unique filename.

Other modules can be required by calling `require` with their module name
(without the file extension):

    var SomeComponent = require('SomeComponent')

Files which use React's [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html)
syntax must have a `.jsx` extension and begin with a block comment containing
the JSX pragma, otherwise they will not be compiled:

    /** @jsx React.DOM */

If you have a documentation comment at the start of a `.jsx` module, it must have
the JSX pragma *on the last line*.

### Building ###

Lifequote uses [gulp](http://gulpjs.com) to compile JSX to JavaScript and to
create a build of the codebase which hooks required dependencies up.

By default, it will copy an uncompressed version of the built app to
`/public/js/app.js`.

To install development dependencies:

    npm install
    npm install -g gulp

This will install a global `gulp` command. Running `gulp` in the lifequote
project directory will trigger an initial build and will leave gulp watching for
any changes to `.js` and `.jsx` files under `/src`, which will automatically trigger
a rebuild.

With both the dev server and gulp running, you can refresh the page after making
changes to pick up the latest build.
