//tool function
export async function get_current_weather(toolArgs) {
    return {
        temperature: 22,
        unit: 'celsius',
        description: 'it is sunny in ' + toolArgs.city,
    };
}

//tool definition
export const tool = {
    type: 'function',
    function: {
        name: 'get_current_weather',
        description: 'Get the current weather for a city',
        parameters: {
            type: 'object',
            properties: {
                city: {
                    type: 'string',
                    description: 'The name of the city',
                },
            },
            required: ['city'],
        },
    },
}

//test prompt
export const prompt = {
    role: 'user',
    content: 'What is the weather like in New York?'
}