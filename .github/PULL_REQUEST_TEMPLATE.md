# ✅ AVS Information Submission Guide

## 📌 Basic Info

### 🏷️ Project Name
Name of your AVS project
<!-- Example: Lagrange ZK Prover Network -->

### 🌐 Network
Specify the network: `Ethereum Mainnet` or `Ethereum Holesky`

### 🧾 AVS Address
Smart contract address of the AVS on Ethereum
<!-- Example: 0xf98d5de1014110c65c51b85ea55f73863215cc10 -->

### 🗂️ Category
Nature of the project (multiple allowed)
<!-- Example: ZK, Oracle -->  
<!-- Refer to: /eigenlayer/schema/avs_category.json -->

---

## 🔐 Slashing

### ✅ Is Slashing Implemented?
`true` / `false`

### 🔗 Slashing Documentation
Link to slashing-related documentation
<!-- Example: https://docs.avs.org/slashing -->

### 🧑‍🔧 Operator Sets
Repeat the following for each operator set:

#### 🔢 ID
Unique identifier for the operator set
<!-- Example: 1 -->

#### ⚙️ Mechanism Type
Type of slashing mechanism
<!-- Example: deterministic, challenge_period, committee_based -->

#### 📊 Metadata for This Mechanism
For each of the following attributes:

- **Name**: One of `mechanism`, `enforcement`, `openness`, `incentive`
- **Is Aligned**: `true` / `false`  
  (Does this align with standards listed below?)
- **Source**: Link to reference documentation
  <!-- Example: https://docs.avs.org/slashing/mechanism -->

---

## 💰 Rewards

### ✅ Is Reward Mechanism Implemented?
`true` / `false`

### 🔗 Reward Documentation
Link to documentation or UI
<!-- Example: https://app.eigenlayer.xyz/avs/... -->

---

## 📞 Contact Info

### 📲 Telegram
Link to your project’s Telegram
<!-- Example: https://t.me/AVSCommunity -->

### 💬 Discord
Link to your project’s Discord
<!-- Example: https://discord.gg/projectxyz -->
