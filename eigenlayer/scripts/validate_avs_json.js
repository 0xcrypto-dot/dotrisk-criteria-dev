const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("fs");

if (process.argv.length < 5) {
    console.error("Usage: node validate_json.js <json_file> <category_file> <schema_file>");
    process.exit(1);
}

const jsonFile = process.argv[2];
const categoryFile = process.argv[3];
const schemaFile = process.argv[4];

console.log(`🔍 Validating JSON file: ${jsonFile}`);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync(schemaFile, "utf8"));
const fileData = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
const categories = JSON.parse(fs.readFileSync(categoryFile, "utf8")).categories;

const validate = ajv.compile(schema);
const valid = validate(fileData);

if (!valid) {
    console.error("JSON Schema validation failed:", validate.errors);
    process.exit(1);
}

const invalidCategories = fileData.projects
    .map((project) => project.category)
    .filter((category) => !categories.includes(category));

if (invalidCategories.length > 0) {
    console.error(`Invalid categories found: ${invalidCategories.join(", ")}`);
    process.exit(1);
}

console.log("JSON validation successful!");
