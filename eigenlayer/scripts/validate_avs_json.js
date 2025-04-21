const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("fs");

if (process.argv.length < 6) {
    console.error("Usage: node validate_json.js <main_json> <slashing_json> <category_file> <main_schema> <slashing_schema>");
    process.exit(1);
}

const mainJsonFile = process.argv[2];
const slashingJsonFile = process.argv[3];
const categoryFile = process.argv[4];
const mainSchemaFile = process.argv[5];
const slashingSchemaFile = process.argv[6];

console.log("Validating JSON files...");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const mainSchema = JSON.parse(fs.readFileSync(mainSchemaFile, "utf8"));
const slashingSchema = JSON.parse(fs.readFileSync(slashingSchemaFile, "utf8"));
const mainData = JSON.parse(fs.readFileSync(mainJsonFile, "utf8"));
const slashingData = JSON.parse(fs.readFileSync(slashingJsonFile, "utf8"));
const categories = JSON.parse(fs.readFileSync(categoryFile, "utf8")).categories;

const validateMain = ajv.compile(mainSchema);
const mainValid = validateMain(mainData);

if (!mainValid) {
    console.error("Main JSON Schema validation failed:", validateMain.errors);
    process.exit(1);
}

const validateSlashing = ajv.compile(slashingSchema);
const slashingValid = validateSlashing(slashingData);

if (!slashingValid) {
    console.error("Slashing JSON Schema validation failed:", validateSlashing.errors);
    process.exit(1);
}

const invalidCategories = mainData.avs_projects
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

slashingData.avs_operator_sets.forEach(avs => {
    avs.operator_sets.forEach(set => {
        set.mechanisms.forEach(mechInfo => {
            const mechanism = mechInfo.mechanism;
            const metadata = mechInfo.metadata.map(m => m.name);

            const requiredFields = mechanismRequiredMetadata[mechanism] || [];
            const missingFields = requiredFields.filter(field => !metadata.includes(field));
            const extraFields = metadata.filter(field => !requiredFields.includes(field));

            if (missingFields.length > 0 || extraFields.length > 0) {
                invalidMetadata.push({
                    avs_address: avs.avs_address,
                    operatorSet: set.id,
                    mechanism,
                    missingFields,
                    extraFields
                });
            }
        });
    });
});

if (invalidMetadata.length > 0) {
    console.error("Invalid metadata configuration:");
    invalidMetadata.forEach(error => {
        console.error(`AVS Address: ${error.avs_address}, Operator Set: ${error.operatorSet}, Mechanism: ${error.mechanism}`);
        if (error.missingFields.length > 0) {
            console.error(`  Missing required fields: ${error.missingFields.join(", ")}`);
        }
        if (error.extraFields.length > 0) {
            console.error(`  Extra fields not allowed: ${error.extraFields.join(", ")}`);
        }
    });
    process.exit(1);
}

const mainAddresses = new Set(mainData.avs_projects.map(p => p.avs_address.toLowerCase()));
const slashingAddresses = new Set(slashingData.avs_operator_sets.map(s => s.avs_address.toLowerCase()));

const missingInMain = [...slashingAddresses].filter(addr => !mainAddresses.has(addr));
const missingInSlashing = [...mainAddresses].filter(addr => !slashingAddresses.has(addr));

if (missingInMain.length > 0) {
    console.error("AVS addresses in slashing mechanism not found in main:", missingInMain);
    process.exit(1);
}

console.log("JSON validation successful!");