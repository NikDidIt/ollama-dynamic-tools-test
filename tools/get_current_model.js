
//tool function
export async function get_current_model(toolArgs, response) {
    //Option 1 - Query Ollama for currently loaded models
    /*const response = await fetch("http://localhost:11434/api/ps");
    const data = await response.json();
    let models = [];
    data.models.forEach(model => {
        models.push(model.name);
    });
    data.friendlyDescription = "The currently loaded model is: " + models.join(", ");
    */

    //Option 2 - Pull model data back from the response
    let data = {};
    data.friendlyDescription = "The currently loaded model is: " + response.model;

    return data;
}

//tool definition
export const tool = {
    type: 'function',
    function: {
        name: 'get_current_model',
        description: 'Get the current loaded ai model',
    },
}

//test prompt
export const prompt = {
    role: 'user',
    content: 'What is the current AI model am I talking to?'
}