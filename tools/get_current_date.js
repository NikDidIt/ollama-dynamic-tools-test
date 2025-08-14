
//tool function
export async function get_current_date(toolArgs, response) {
    //let currentDate = new Date();
    //return {currentDate: currentDate.toDateString()};

    return {currentDate: response.created_at};
}

//tool definition
export const tool = {
    type: 'function',
    function: {
        name: 'get_current_date',
        description: 'Get the current date',
    },
}

//test prompt
export const prompt = {
    role: 'user',
    content: 'What is todays date?'
}