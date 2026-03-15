import { parseURL } from "~/server/link_parse/parser";

let url: string | undefined = process.argv[2];
console.log(process.argv);
if (!url) {
  console.error("Please provide a URL as a command line argument.");
  process.exit(1);
}

parseURL(url).then((result) => {
  console.log("Parsed result:", result);
});
