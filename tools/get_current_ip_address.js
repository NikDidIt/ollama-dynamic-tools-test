
//tool function
export async function get_current_ip_address() {
    //https://api.ipify.org?format=json
    //https://ifconfig.co/json
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    //data.ip;
    data.friendlyDescription = "The current internet ip address is: " + data.ip;
    return data;
}

//tool definition
export const tool = {
    type: 'function',
    function: {
        name: 'get_current_ip_address',
        description: 'Get the current internet ip address for the network',
    },
}

//test prompt
export const prompt = {
    role: 'user',
    content: 'What is the current internet ip address for the network?'
}