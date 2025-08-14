import fs from 'fs';

const toolsPath = './tools'

let buildList = [];
buildList.push(`export const dynamicTools = {};\n`);
buildList.push(`console.log("Loading Tools:");\n`);
try {
  const files = fs.readdirSync(toolsPath);
  files.forEach(file => {
    //console.log(file.split('.')[0]);
    let toolFile = file.split('.')[0];
    let ext = file.split('.')[1];
    if (ext == "js") {
        const fullPath = toolsPath + "/" + file;

        buildList.push(`import * as ${toolFile} from '${fullPath}'`);
        buildList.push(`console.log("  - ", ${toolFile}.tool.function.name, " loaded!");`);
        buildList.push(`dynamicTools.${toolFile} = {tool:${toolFile}.tool, function:${toolFile}.${toolFile}, prompt:${toolFile}.prompt}\n`);
    }
  });
} catch (err) {
  console.error('Error reading directory:', err);
}

buildList.push(`//console.log(JSON.stringify(dynamicTools, null, 2));`);

fs.writeFileSync('./sysgen_tools.js', buildList.join('\n'));

console.log(buildList.join('\n'));

