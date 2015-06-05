# WP-SkitJS
**SkitJS** &amp; **WordPress** integration through **WP-API**

#### TL;DR
**SkitJS** as a frontend, **WordPress** as backend. They communicate using **WP-API** (just one-way data).

## Description
This example is a proof-of-concept about how to separate de view of WordPress, making it independent and comunicating (one-way data) though Json API (**WP-API**) To handle the View part I chose [SkitJS](http://skitjs.com/).

## Use

1. Clone/download this repo and place it anywhere you need and `cd` to it using Terminal.
2. Install [WP-API](https://wordpress.org/plugins/json-rest-api/) plugin to your WordPress installation and activate-it. Test it going to `http://localhost/wordpress/wp-json/posts/` and you'll see the json output.
3. Install npm dependencies, like SkitJS, Handlebars and others: `$ npm install` (Maybe you'll need `sudo`-it).
4. Change the path to your json to fit your localhost environment in `main.js`, line 19:
```
var API_PATH = 'http://localhost/wordpress/wp-json/';
```
5. Run: `$ node main.js`. A port will enable (probably :3002)
6. Navigate to [localhost:3002](http://localhost:3002) and start to navigate.
