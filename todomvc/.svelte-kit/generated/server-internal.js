
import root from './root.svelte';
import { set_building, set_paths, set_version } from '../../node_modules/@sveltejs/kit/src/runtime/shared.js';

set_paths({"base":"","assets":""});
set_version("1681051163180");

export const options = {
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	hooks: null, // added lazily, via `get_hooks`
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!-- <!DOCTYPE html>\r\n<html lang=\"en\">\r\n  \r\n<head>\r\n  <title>Titanic D3 Scroll Example</title>\r\n  <script src=\"https://d3js.org/d3.v4.min.js\"></script>\r\n\r\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css\"/>\r\n  <link rel=\"stylesheet\" type=\"text/css\" ref=\"../todomvc/css/titanic.css\"/>\r\n  " + head + "\r\n</head>\r\n<body>\r\n<div class=\"container\">\r\n  <div id='graphic'>\r\n    <div id='sections'>\r\n      <section class=\"step\">\r\n        <div class=\"title\">Titanic Scrolling D3 Visualisation</div>\r\n         A short demo of a scrolling data story using the Kaggle Titanic Data source - SCROLL TO START<br/><br/>\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">HMS Titanic</div>\r\n        On the 10th April HMS Titanic started on her journey from Southampton.  There were 891* passengers on board. <br><br>\r\n        <div class=\"note\">* There were actually approx. 1317 passengers on board but this is the total in the data.</div>\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">Passenger Gender</div>\r\n        There were more men than women on board.\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">Passenger Age</div>\r\n        Age ranged from 5 months to 80 years but the majority were aged between 15 and 45 years old.\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">Passenger Class</div>\r\n        There was a much larger proportion of passengers in 3rd class but 1st and 2nd class numbers were similar.\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">Tragedy</div>\r\n        Only 342 passengers survived - that's 38%.<br><br>Who had the best chances?\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">Passenger Gender</div>\r\n        Women definitely had better odds than men.\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">Passenger Age</div>\r\n        Age isn't so significant but under 15's had the highest survival rate with 15-30s and over 70s had the lowest.\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">Passenger Class</div>\r\n        Passengers in 3rd class had a significantly lower survival rate than those in 1st and 2nd class.\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">1st and 2nd Class Children</div>\r\n        And 1st and 2nd Class children (under 15) had the highest survival rate of them all.\r\n      </section>\r\n      <section class=\"step\">\r\n        <div class=\"title\">Conclusion</div>\r\n       Women and Children travelling in 1st and 2nd class had an amazing 95% of survival.<br><br>\r\n       A long standing myth visually proven - thanks in the most part to the wonderful <a href='http://vallandingham.me/scroller.html'>Jim Vallandingham</a>.  For more info, see my Medium article.\r\n      </section>\r\n    </div>\r\n    <div id='vis'>\r\n    </div>\r\n    <div id=\"extra-space\">\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<script src=\"../todomvc/js/scroller.js\"></script>\r\n<script src=\"/js/sections.js\"></script>\r\n</body>\r\n</html> -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n\t<meta charset=\"utf-8\" />\r\n\t<link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\r\n\t<meta name=\"viewport\" content=\"width=device-width\" />\r\n\t%sveltekit.head%\r\n</head>\r\n\r\n<body data-sveltekit-preload-data=\"hover\">\r\n\t<div style=\"display: contents\">" + body + "</div>\r\n</body>\r\n\r\n</html>\r\n\r\n<style>\r\n\thtml {\r\n\t\tbackground-color: #f8f7f6;\r\n\t}\r\n\r\n\t/* body {\r\n\t\theight: 100vh;\r\n\t\tmargin: 0;\r\n\t\tpadding: 0;\r\n\t} */\r\n</style>",
		error: ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid #ccc;\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	}
};

export function get_hooks() {
	return {};
}

export { set_building, set_paths };
