# Smooth Combat (Foundry VTT module)

Smooth Combat automates D&D 5e attack rolls against targeted creature AC and applies damage on hit. It listens for D&D 5e attack rolls, compares the roll total to each targeted token's AC, and applies damage automatically if the attack hits.

## Features
- Uses standard D&D 5e attack rolls (including bonuses and advantage/disadvantage from the item roll).
- Compares the roll total to each target's AC.
- Rolls damage and applies it when the attack hits.
- Does nothing on a miss.

## Usage
1. Install the module in Foundry VTT.
2. Enable **Smooth Combat** in your world.
3. Select a token and target one or more tokens.
4. Roll an attack from the character sheet. The module compares the roll to each target's AC and applies damage if it hits.

## Notes
- The module uses `dnd5e.rollAttack` to detect attack rolls and relies on `item.rollDamage()` to apply damage.
- If the system provides `Actor.applyDamage`, it uses that. Otherwise, it directly updates HP.

## Development
The module entry point is `scripts/auto-attack.js`, referenced by `module.json`.
