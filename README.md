# LaTeX to Speech Executable

This project builds a standalone executable for converting LaTeX expressions into speech as part of a TTS pipeline.  

It uses **KaTeX** to convert LaTeX into MathML, and then **Speech Rule Engine (SRE)** to generate spoken output.  

## Why the “hack”

SRE's CLI depends on `commander`, which calls `requireExt` internally. This breaks when trying to bundle into a single executable. To work around this, I figured I could

- Import SRE directly from `speech-rule-engine/cjs/common/system.js`.
- Bundles the language JSON files (`mathmaps`) with the binary.

This avoids the Commander dependency entirely and lets the executable run independently.  

> ⚠️ Disclaimer: I don't normally write JavaScript or use node, so there might be a much cleaner ways to do this. If you know of a better approach for bundling SRE, feel free to open a PR ⚠️

## Build

Bundle your CLI script:

```bash
npx esbuild cli.js --bundle --platform=node --format=cjs --outfile=bundle.js
```

Then build the single-executable using Node’s SEA API:

```bash
node --build-sea sea-config.json
```

Make sure to include the `mathmaps` folder or list the JSON files as assets in your `sea-config.json`


## Usage

```bash
./latex2clearspeak.exe "1+1"
```

This will output the spoken equivalent of the LaTeX expression.