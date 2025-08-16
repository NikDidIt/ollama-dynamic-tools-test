import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync("./create_memory_item.db");
db.exec(`CREATE TABLE IF NOT EXISTS memory_items (
            item_id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_add_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
            item_what TEXT, item_when TEXT, 
            item_where TEXT, item_why TEXT, 
            item_how TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Table "users" created or already exists.');
            }
        });

//tool function
export async function recall_memory_item(toolArgs, response) {
    //console.log("recall_memory_item: toolArgs: ",JSON.stringify(toolArgs, null, 2),response)

    const select = db.prepare(`SELECT item_id, item_add_dt, item_what, item_where, item_why, item_how 
        FROM memory_items 
        WHERE item_what LIKE ? OR item_where LIKE ? OR item_why LIKE ? OR item_how LIKE ?
        ORDER BY item_add_dt DESC
        LIMIT 1`);
    let results = select.get(like(toolArgs.topic || ""), like(toolArgs.topic || ""), 
                             like(toolArgs.topic || ""), like(toolArgs.topic || ""));
    
    //console.log("results: ",JSON.stringify(results, null, 2))
    
    if (results == undefined) {
        return {friendlyDescription: `No memory item found for ${toolArgs.topic}.`};
    } else {
        return {
            results:results,
            friendlyDescription: `Memory item for ${toolArgs.what} was last created at ${results.item_add_dt}.`,
        };
    }
}

//tool definition
export const tool = {
    type: 'function',
    function: {
        name: 'recall_memory_item',
        description: 'recall a memory for storage that was previously created.',
        parameters: {
            type: 'object',
            properties: {
                topic: {
                    type: 'string',
                    description: 'what is being looked of',
                },
                when: {
                    type: 'string',
                    description: 'when did it happen',
                },
            },
            required: ['topic'],
        },
    },
}

//test prompt
export const prompt = {
    role: 'user',
    content: 'When did I last change the air conditioning filter?'
}

function like(item) {
    return `%${item}%`
}