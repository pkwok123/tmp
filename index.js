const https = require("https");
const qs = require("querystring");
const cheerio = require("cheerio");

const BASE_URL_PREFIX =
	"https://www.worldcat.org/search?qt=worldcat_org_bks&q=harry+potter";
const BASE_URL_SUFFIX = "&fq=dt%3Abks";

function getBookName(name) {
	const encodedName = qs.encode(name);

	const url = BASE_URL_PREFIX + encodedName + BASE_URL_SUFFIX;

	https
		.get(url, res => {
			console.log("statusCode:", res.statusCode);
			console.log("headers:", res.headers);
			console.log("----------------");

			let html = "";

			res.on("data", d => {
				html += d;
				//process.stdout.write(d);
			});

			res.on("end", () => {
				const $ = cheerio.load(html);

				const res = $("#resultsform").html();
				console.log(res);
			});
		})
		.on("error", e => {
			console.error(e);
		});
}

getBookName("Harry Potter");
