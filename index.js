import { Ollama } from 'ollama'
import { dynamicTools } from './sysgen_tools.js'

/*local*/
const host = 'http://localhost:11434'
const model = 'qwen2.5:1.5b'

const DEBUG = false;
const tools = [];

//add dynamic Tools
for (const toolName in dynamicTools) {
    if (dynamicTools.hasOwnProperty(toolName)) {
        const tool = dynamicTools[toolName].tool;
        tools.push(tool);
    }
}
if (DEBUG) console.log("Tools: ",JSON.stringify(tools, null, 2));

let messages = [{"role": "system", "content": "You are a helpful assistant that will give information from the tools provided to you."}];
/*Example messages*/
//messages.push({ role: 'user', content: 'Why is the sky blue?' }); //non-tool question
//messages.push({ role: 'user', content: 'What is the weather like in New York?' });
//messages.push({ role: 'user', content: 'What is the current internet ip address for the network?' });
//messages.push({ role: 'user', content: 'What time is it?' });
//messages.push({ role: 'user', content: 'What is todays date?' });
//messages.push({ role: 'user', content: 'What is the current AI model am I talking to?' });
messages.push({ role: 'user', content: 'Set up a meeting for next Friday at 4pm for a meeting with John Doe. We will meet confrence room A. We will disscuss stock options.' });

const ollama = new Ollama({ host: host })
const response = await ollama.chat({
  model: model,
  messages: messages,
  tools: tools,
});

if (DEBUG) console.log("response: ",JSON.stringify(response, null, 2));

if (response.message.tool_calls) { //Tool call
    for (const toolCall of response.message.tool_calls) {
        const toolName = toolCall.function.name;
        const toolArgs = toolCall.function.arguments;
        if (DEBUG) console.log("toolName: ",toolName);
        if (DEBUG) console.log("toolArgs: ",JSON.stringify(toolArgs));
        // Execute your local tool function based on toolName and toolArgs
        let toolOutput;
        if (dynamicTools.hasOwnProperty(toolName)) {
            toolOutput = await dynamicTools[toolName].function(toolArgs, response);
        } else {
            toolOutput = response.message.content;
            console.log(`Unknown tool: ${toolName}`);
        }

        // Add the tool output to the messages and make another chat call
        const finalResponse = await ollama.chat({
            model: model,
            messages: [
                ...messages, // Include previous messages for context
                {
                    role: 'tool',
                    content: JSON.stringify(toolOutput),
                    tool_call_id: toolCall.id, // Important for linking the tool output
                },
            ],
        });
        console.log("finalResponse: ",finalResponse.message.content); // The final answer
    }
} else { //Non-Tool call
    console.log("response: ",response.message.content); // Direct response from the model
}

