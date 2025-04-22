const fs = require("fs");
const path = require("path");

const network = process.env.NETWORK;
if (!network) {
    console.error("Missing NETWORK env var (holesky/mainnet)");
    process.exit(1);
}

const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
const prBody = event.pull_request.body;

function extractField(label) {
    const regex = new RegExp(`${label}\\s*:\\s*(.+)`, "i");
    const match = prBody.match(regex);
    return match ? match[1].trim() : "";
}


const newEntry = {
    name: extractField("Name of your AVS project"),
    avs_address: extractField("Smart contract address of the AVS on Ethereum").toLowerCase(),
    category: extractField("Nature of the project").split(',').map(s => s.trim()).filter(Boolean),
    criteria: {
        slashing: {
            is_implemented: extractField("Is Slashing Implemented?") === "true",
            url: extractField("Link to slashing-related documentation")
        },
        reward: {
            is_implemented: extractField("Is Reward Mechanism Implemented?") === "true",
            url: extractField("Link to reward-related documentation")
        }
    },
    contact: {
        telegram: extractField("Link to your project’s Telegram"),
        discord: extractField("Link to your project’s Discord")
    }
};

const jsonPath = path.join("eigenlayer", network, "avs_main.json");

if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    process.exit(1);
}

const existing = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const updatedProjects = existing.avs_projects.filter(
    p => p.avs_address.toLowerCase() !== newEntry.avs_address
);

updatedProjects.push(newEntry);
existing.avs_projects = updatedProjects;

fs.writeFileSync(jsonPath, JSON.stringify(existing, null, 2));
console.log(`✅ ${newEntry.name} added/updated in ${jsonPath}`);
