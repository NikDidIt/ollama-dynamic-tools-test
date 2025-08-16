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
export async function create_memory_item(toolArgs, response) {
    //console.log("create_memory_item: toolArgs: ",JSON.stringify(toolArgs, null, 2))

    const insert = db.prepare(`INSERT INTO memory_items (item_what, item_when, item_where, item_why, item_how) VALUES (?, ?, ?, ?, ?)`);
    insert.run(toolArgs.what || "", toolArgs.when || "", toolArgs.where || "", toolArgs.why || "", toolArgs.how || "");

    return {
        toolArgs:toolArgs,
        currentTime: response.created_at, 
        friendlyDescription: `Memory item for ${toolArgs.what} created.`,
        date: toolArgs.when,
    };
}

//tool definition
export const tool = {
    type: 'function',
    function: {
        name: 'create_memory_item',
        description: 'Create a memory for storage that can be recalled later.',
        parameters: {
            type: 'object',
            properties: {
                what: {
                    type: 'string',
                    description: 'what happened',
                },
                when: {
                    type: 'string',
                    description: 'when did it happen',
                },
                where: {
                    type: 'string',
                    description: 'where did it happen',
                },
                why: {
                    type: 'string',
                    description: 'why did it happen',
                },
                how: {
                    type: 'string',
                    description: 'how did it happen',
                },

            },
            required: ['what'],
        },
    },
}

//test prompt
export const prompt = {
    role: 'user',
    content: 'I changed the air conditioning filter today.'
}