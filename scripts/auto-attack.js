const MODULE_ID = "smooth-combat";

Hooks.once("ready", () => {
  console.log(`${MODULE_ID} | Ready`);
});

async function resolveAttackAgainstTargets(item, roll) {
  if (!item?.actor || !roll) return;

  const targets = Array.from(game.user?.targets ?? []);
  if (!targets.length) return;

  for (const targetToken of targets) {
    const targetActor = targetToken.actor;
    if (!targetActor) continue;

    const targetAC = targetActor.system?.attributes?.ac?.value;
    if (typeof targetAC !== "number") continue;

    const hit = roll.total >= targetAC;
    if (!hit) continue;

    const damageRoll = await item.rollDamage({
      critical: false,
      configureDialog: false
    });

    if (!damageRoll) continue;

    const damageTotal = damageRoll.total ?? 0;
    if (!damageTotal) continue;

    if (typeof targetActor.applyDamage === "function") {
      await targetActor.applyDamage(damageTotal);
    } else {
      const hp = targetActor.system?.attributes?.hp;
      if (!hp) continue;
      const newValue = Math.max(hp.value - damageTotal, 0);
      await targetActor.update({ "system.attributes.hp.value": newValue });
    }
  }
}

Hooks.on("dnd5e.rollAttack", async (item, roll) => {
  await resolveAttackAgainstTargets(item, roll);
});
