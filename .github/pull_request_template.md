# AVS Metadata Update Checklist

To update the metadata of an AVS (Actively Validated Service), please follow the steps below.

---

## ✅ Steps

### 1. Read the Data Update Guide
📘 [Protocol AVS Page's Data Update Guide](https://narrow-cello-dab.notion.site/Protocol-AVS-Page-s-Data-Update-Guide-1dec62052b8e801d8f6afab80d1a5f0a?pvs=4)

### 2. Refer to the Sample JSONs
You can update **either one** of the JSON files or **both**, depending on what needs to be changed.

#### 2.1 Update Reward / Slashing Policy Status
📄 [Sample: reward_slashing_policy_status.json](https://github.com/a41-official/dotrisk-criteria-dev/blob/main/eigenlayer/holesky/sample/reward_slashing_policy_status.json)

> ⚠️ Notes:
> - The `category` field must match one of the entries listed in [avs_category.json](https://github.com/a41-official/dotrisk-criteria-dev/blob/main/eigenlayer/schema/avs_category.json).
> - If your AVS does not fit any of the listed categories, please leave a comment in the PR to suggest a new one.

#### 2.2 Update Operator Set Slashing Mechanism
📄 [Sample: operator_set_slashing_mechanism.json](https://github.com/a41-official/dotrisk-criteria-dev/blob/main/eigenlayer/holesky/sample/operator_set_slashing_mechanism.json)

> ⚠️ Notes:
> - One operator set **can have multiple slashing mechanisms**.
> - A **deterministic slashing mechanism** does **not** include a `REWARDS` field.
---

### 3. Make Your Own JSON

1. Create a folder under the following path with your AVS address:  
   `/eigenlayer/{network}/{avs_address}`  
   _Example: `/eigenlayer/holesky/0x37b223e9d3dbebf2a08c358b8ef9f024fc134f8f`_

2. Add the following files inside that folder:
   - `reward_slashing_policy_status.json`
   - `operator_set_slashing_mechanism.json`

---

## ✅ Checklist

- [ ] I have read the [Data Update Guide](https://narrow-cello-dab.notion.site/Protocol-AVS-Page-s-Data-Update-Guide-1dec62052b8e801d8f6afab80d1a5f0a?pvs=4)
- [ ] I have reviewed the sample JSONs and followed the guideline

---

