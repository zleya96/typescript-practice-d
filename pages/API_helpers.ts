export async function formatAPIRequest(template: string, ...values: any[]): Promise<string> {
    return template.replace(/{(\d+)}/g, (match, p1) => {
        const index = parseInt(p1, 10);
        return index < values.length ? String(values[index]) : match;
    });

}

/*
This function, formatAPIRequest, is designed to format a string template by replacing placeholders with corresponding values provided as arguments. Here's a breakdown:

Function Signature:
template: A string containing placeholders in the format {0}, {1}, etc.
...values: A rest parameter that accepts an array of values to replace the placeholders in the template.
Function Logic:
template.replace:

The replace method is used to find and replace all placeholders in the template string.
The regular expression /\{(\d+)\}/g matches placeholders like {0}, {1}, etc.:
{} ensures the placeholder is enclosed in curly braces.
\d+ matches one or more digits inside the braces.
() captures the digits for use in the replacement logic.
g ensures all occurrences are replaced (global match).
Callback Function:

The callback (match, p1) is executed for each match:
match: The full matched placeholder (e.g., {0}).
p1: The captured digits inside the braces (e.g., 0).
Replacement Logic:

parseInt(p1, 10): Converts the captured digits (p1) into an integer (index).
index < values.length: Checks if the index is within the bounds of the values array.
String(values[index]): If valid, replaces the placeholder with the corresponding value from the values array, converted to a string.
match: If the index is out of bounds, the placeholder is left unchanged.

Example Usage:
const template = "Hello, {0}! You have {1} new messages.";
const result = await formatAPIRequest(template, "Alice", 5);
console.log(result); // Output: "Hello, Alice! You have 5 new messages."
*/