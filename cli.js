const path = require('path');

// Point to the local mathmaps folder
global.SREfeature = {
  json: path.resolve(__dirname, 'mathmaps')
};

const katex = require("katex");
const sre = require('speech-rule-engine/cjs/common/system.js');


// Latex to clearspeech conversion.
function cleanLatex(latex) {
  return latex
    .replace(/\s+/g, ' ')
    .trim();
}

async function latexToSpeech(latex) {

  const cleaned = cleanLatex(latex);

  await sre.setupEngine({
    domain: "clearspeak"
  });

  const html = katex.renderToString(cleaned, {
    output: "mathml",
    throwOnError: false,
  });

  const mathml = html.substring(html.indexOf("<math"), html.indexOf("</math>") + 7);

  return sre.toSpeech(mathml);
}


// CLI
const latex = process.argv[2] || '';
if (!latex) {
  console.error("Usage: latex-to-speech \"<LaTeX>\"");
  process.exit(1);
}

(async () => {
  const text = await latexToSpeech(latex);
  console.log(text);
})();