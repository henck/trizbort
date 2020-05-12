# Trizbort.io

[Trizbort.io](https://www.trizbort.io) is a JavaScript implementation of [Trizbort](http://www.trizbort.com), the adventure game mapping and code generation software. It aims to provide all Trizbort features in the browser, so that no download is required to create and share Trizbort maps, and generate code for several adventure design systems.

![Drawing a map in Trizbort.io](https://www.trizbort.io/assets/map.png)

## Code generation

<img align="right" src="https://www.trizbort.io/assets/trizbort-code-generation.png">At the moment, Trizbort.io supports code generation for the following design systems and formats:

* [Alan 2](https://www.alanif.se/)
* [Alan 3](https://www.alanif.se/)
* [Inform 7](http://inform7.com/)
* [Quest](http://textadventures.co.uk/quest)
* [TADS 3](https://www.tads.org/tads3.htm)
* [TextAdventure.js](https://github.com/TheBroox/TextAdventure.js)
* [ZIL](https://archive.org/details/Learning_ZIL_Steven_Eric_Meretzky_1995)
* YAML

Code generation is more complete for some systems than for others. Experts are very welcome to contribute to make code generation results more complete. Code generation for Ink and Hugo may be added in the future.

## Contributing

Trizbort.io is written in TypeScript using the [JAMstack](https://jamstack.org/). There is no server back-end and there are few dependencies. It is simple to get it to run locally so you can hack on it. To do so:

* Install [Node.js](https://nodejs.org/) (even if you have Node.js, a recent version is recommended). It will come with [npm](https://www.npmjs.com/), the Node.js package manager.
* Fork the project to a local directory.
* Run `npm install` to install all dependencies. This includes TypeScript, [Grunt](https://gruntjs.com/), Handlebars and Express.
* Build the project by running `grunt build`. 
* Optionally run `grunt watch`. This will rebuild parts of the project whenever you make a change.
* Start an Express development server with `npm run start:dev`. This server will listen on port 3000.
* Open `http://localhost:3000/index.html` in your browser.

## Public web application

The public end-user implementation of Trizbort runs at [Trizbort.io](https://www.trizbort.io). The implementation is updated regularly to reflect changes as these are built into this repository.
