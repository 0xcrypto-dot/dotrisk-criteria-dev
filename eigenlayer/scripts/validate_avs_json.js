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

console.log(`Validating JSON file: ${jsonFile}`);

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
    .flatMap((project) => Array.isArray(project.category) ? project.category : [project.category])
    .filter((category) => !categories.includes(category));

if (invalidCategories.length > 0) {
    console.error(`Invalid categories found: ${invalidCategories.join(", ")}`);
    process.exit(1);
}

const mechanismRequiredMetadata = {
    "DETERMINISTIC": ["SUITABILITY", "ENFORCEMENT", "TRANSPARENCY"],
    "CHALLENGE_PERIOD": ["SUITABILITY", "ENFORCEMENT", "TRANSPARENCY", "REWARDS"],
    "COMMITTEE_BASED": ["SUITABILITY", "ENFORCEMENT", "TRANSPARENCY", "REWARDS"]
};

const invalidMetadata = [];

fileData.projects.forEach(project => {
    if (project.criteria?.slashing?.operator_sets) {
        project.criteria.slashing.operator_sets.forEach(set => {
            set.mechanisms.forEach(mechInfo => {
                const mechanism = mechInfo.mechanism;
                const metadata = mechInfo.metadata.map(m => m.name);

                const requiredFields = mechanismRequiredMetadata[mechanism] || [];
                const missingFields = requiredFields.filter(field => !metadata.includes(field));
                const extraFields = metadata.filter(field => !requiredFields.includes(field));

                if (missingFields.length > 0 || extraFields.length > 0) {
                    invalidMetadata.push({
                        project: project.name,
                        operatorSet: set.id,
                        mechanism,
                        missingFields,
                        extraFields
                    });
                }
            });
        });
    }
});

if (invalidMetadata.length > 0) {
    console.error("Invalid metadata configuration:");
    invalidMetadata.forEach(error => {
        console.error(`Project: ${error.project}, Operator Set: ${error.operatorSet}, Mechanism: ${error.mechanism}`);
        if (error.missingFields.length > 0) {
            console.error(`  Missing required fields: ${error.missingFields.join(", ")}`);
        }
        if (error.extraFields.length > 0) {
            console.error(`  Extra fields not allowed: ${error.extraFields.join(", ")}`);
        }
    });
    process.exit(1);
}

console.log("JSON validation successful!");