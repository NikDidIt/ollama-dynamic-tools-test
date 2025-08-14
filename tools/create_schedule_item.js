//tool function
export async function create_schedule_item(toolArgs) {
    return {
        friendlyDescription: `Schedule item for ${toolArgs.title} created. Please check your calendar for more information.`,
        date: toolArgs.date,
        time: toolArgs.time,
        title: toolArgs.title,
        topic: toolArgs.topic,
        location: toolArgs.location,
    }
}

//tool definition
export const tool = {
    type: 'function',
    function: {
        name: 'create_schedule_item',
        description: 'Create a schedule, meeting, task, or other item in the calendar',
        parameters: {
            type: 'object',
            properties: {
                date: {
                    type: 'string',
                    description: 'date of appointment',
                },
                time: {
                    type: 'string',
                    description: 'time of appointment',
                },
                title: {
                    type: 'string',
                    description: 'title of appointment',
                },
                topic: {
                    type: 'string',
                    description: 'description of appointment',
                },
                location: {
                    type: 'string',
                    description: 'location of appointment',
                },
            },
            required: ['date', 'time', 'title'],
        },
    },
}

//test prompt
export const prompt = { 
    role: 'user', 
    content: 'Set up a meeting for next Friday at 4pm for a meeting with John Doe. We will meet confrence room A. We will disscuss stock options.' 
}