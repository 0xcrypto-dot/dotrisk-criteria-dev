# Slashing Mechanism Submission Guide

## 📌 Basic Info

Specify the network:  
<!-- Example: Mainnet / Holesky -->

Smart contract address of the AVS on Ethereum:  
<!-- Example: `0x870679e138bcdf293b7ff14dd44b70fc97e12fc0` -->

---

## 🧑‍🔧 Operator Sets

🔁 Repeat This Section for Each Operator Set You Operate

Please fill out a separate copy of the "Operator Sets" section for each operator set you are responsible for.

> 💡 **Tip:** If you manage multiple operator sets, make sure to **duplicate the entire block below (from `🧑‍🔧 Operator Sets` to the last Rewards field)** for each one.

Unique identifier for the operator set: 
<!-- Example: 1 -->

### ⚙️ Mechanism Type

Type of slashing mechanism:  
<!-- Example: deterministic, challenge_period, committee_based -->
> 💡 **Tip:**  
> A single operator set can have **multiple slashing mechanism types**.  
> If so, please **duplicate the entire section from `⚙️ Mechanism Type` to the last `Rewards` field** and fill it out **for each mechanism** used by the operator set.
---

### 📋 Metadata for This Mechanism

#### Suitability
is Suitability aligned:  
<!-- Example: `true` / `false` -->

Link to Suitability-related documentation:  

---

#### Enforcement
is Enforcement aligned:  
<!-- Example: `true` / `false` -->

Link to Enforcement-related documentation:  

---

#### Transparency
is Transparency aligned:  
<!-- Example: `true` / `false` -->

Link to Transparency-related documentation:  

---

#### Rewards
is Rewards aligned:  
<!-- Example: `true` / `false` -->

Link to Rewards-related documentation:  


<!-- Additional Example

Let's say this AVS (`0x870679e138bcdf293b7ff14dd44b70fc97e12fc0`) has two operator sets on Holesky,  
and Operator Set 1 has two slashing mechanism types(deterministic, challenge_period).

Specify the network: holesky
Smart contract address of the AVS on Ethereum: 0x870679e138bcdf293b7ff14dd44b70fc97e12fc0

Unique identifier for the operator set: 1
Type of slashing mechanism: deterministic

is Suitability aligned: true
Link to Suitability-related documentation: https://docs.avs.org/slashing/enforcement/1

is Enforcement aligned: true
Link to Enforcement-related documentation: https://docs.avs.org/slashing/enforcement/1

is Transparency aligned: true
Link to Transparency-related documentation: https://docs.avs.org/slashing/enforcement/1

is Rewards aligned: true
Link to Rewards-related documentation: https://docs.avs.org/slashing/enforcement/1

Unique identifier for the operator set: 1
Type of slashing mechanism: challenge_period

is Suitability aligned: true
Link to Suitability-related challenge_period: https://docs.avs.org/slashing/enforcement/1

is Enforcement aligned: false
Link to Enforcement-related challenge_period: https://docs.avs.org/slashing/enforcement/1

is Transparency aligned: true
Link to Transparency-related challenge_period: https://docs.avs.org/slashing/enforcement/1

is Rewards aligned: false
Link to Rewards-related challenge_period: https://docs.avs.org/slashing/enforcement/1

Unique identifier for the operator set: 2
Type of slashing mechanism: committee_based

is Suitability aligned: false
Link to Suitability-related committee_based: https://docs.avs.org/slashing/enforcement/2

is Enforcement aligned: false
Link to Enforcement-related committee_based: https://docs.avs.org/slashing/enforcement/2

is Transparency aligned: true
Link to Transparency-related committee_based: https://docs.avs.org/slashing/enforcement/2

is Rewards aligned: true
Link to Rewards-related committee_based: https://docs.avs.org/slashing/enforcement/2
-->