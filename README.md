# Dynamic tools - Proof of Concept
This takes kind of a plugin approach for adding new tools to an AI. The plugin information is "compiled" in a file that is then loaded before interacting with the AI.

## Getting started
1. Install Nodejs
2. Install Ollama
3. Download the qwen2.5:1.5b model using ````ollama run qwen2.5:1.5b````.
   - This was the smallest model that would reliably work for me. 
4. Download this project source.
5. To get the dependencies run ````npm install````.
6. To use the current set of tools run ````npm run build````. This must be run before running the program.
7. To run the program run ````npm run start````.

## How it works
Running the ````build```` will generate the file ````sysgen_tools.js````. This file will handle loading each of the plugin tool data. This file is called at the top of the index.js file. 

## Issues
1. It does have some issues if it tries to call 2 tools in the same chat. It will either only run one and complain about the other, or not run either. I don't think this is an issue with this code, but more of how the AI model treats the tools.
2. I have only testing in Windows, however it should work in linux also.
