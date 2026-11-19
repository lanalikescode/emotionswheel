// Runs the same checks as check.html, from the command line:
//   node tests/run-checks.js      (or: npm test)
// GitHub runs this automatically after every change (see .github/workflows/check.yml).

const path = require("path");
const checkEmotions = require(path.join(__dirname, "..", "checks.js"));

let data;
try {
  data = require(path.join(__dirname, "..", "emotions.js"));
} catch (err) {
  console.error("✗ emotions.js has a typo and couldn't be read:\n");
  console.error(String(err.stack || err).split("\n").slice(0, 5).join("\n"));
  console.error("\nTip: open check.html in a browser for a friendlier explanation.");
  process.exit(1);
}

const { problems, warnings, counts } = checkEmotions(data);

if (warnings.length) {
  console.log("Worth a look (optional):");
  warnings.forEach((w) => console.log("  • " + w));
  console.log("");
}
if (problems.length) {
  console.error(`✗ ${problems.length} thing(s) to fix:`);
  problems.forEach((p) => console.error("  • " + p));
  process.exit(1);
}
console.log(`✓ All good — ${counts.core} core, ${counts.middle} middle, ${counts.outer} outer emotions.`);
