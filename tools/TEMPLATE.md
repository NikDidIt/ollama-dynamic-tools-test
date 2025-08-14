# Tools

## Three items are needed for the tool file
1. A function that is named the same as the file.
2. The tool definition.
3. Test/Example prompt. (not really needed yet)

## The function
1. The function can take 2 parameters
   - toolArgs - arguments that the AI has figured out the function needs.
   - response - response from the chat message that has the tool information needed in it.

## The tool definition
1. Standard tooling definition.
   - See https://platform.openai.com/docs/guides/function-calling

## Test/Example prompt
1. The prompt that will be used to test the tool.
   - Not currently in use, but could be useful for testing AI outputs with the same prompt.

## For examples
1. get_current_ip_address.js - Basic api call example with no parameters 
2. create_schedule_item.js - Example with parameters
3. get_current_model.js - "Option 1", has an example api call to get information.