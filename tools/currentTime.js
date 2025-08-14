
//tool function
export async function currentTime(toolArgs, response) {
    //Option 1 - create new date and format a time
    /*let currTime = new Date();
    let hours = currTime.getHours()%12;
    if (hours == 0) {
        hours = 12;
    }
    let minutes = currTime.getMinutes() 
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return {currentTime: hours + ":" + minutes + " " + (currTime.getHours() >= 12 ? "PM" : "AM")}; //example: 04:56 PM
    */

    //Option 2 - pull time directly from the response.
    return {currentTime: response.created_at};
}

//tool definition
export const tool = {
    type: 'function',
    function: {
        name: 'currentTime',
        description: 'Get the current time',
    },
}

//test prompt
export const prompt = {
    role: 'user',
    content: 'What time is it?'
}