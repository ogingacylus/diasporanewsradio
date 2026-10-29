import sql from "@/lib/db";

let settingsTableReady: Promise<void> | undefined;

async function ensureSettingsTable() {
  settingsTableReady ??= sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      site_locked BOOLEAN NOT NULL DEFAULT FALSE
    )
  `
    .then(() => undefined)
    .catch((error) => {
      settingsTableReady = undefined;
      throw error;
    });

  await settingsTableReady;
  await sql`
    INSERT INTO site_settings (id, site_locked)
    VALUES (1, FALSE)
    ON CONFLICT (id) DO NOTHING
  `;
}

export async function getSiteLocked() {
  await ensureSettingsTable();
  const [setting] = await sql`
    SELECT site_locked FROM site_settings WHERE id = 1
  `;

  if (!setting) {
    throw new Error("Site settings were not initialized");
  }

  if (typeof setting.site_locked !== "boolean") {
    throw new Error("Site lock setting has an invalid value");
  }

  return setting.site_locked;
}

export async function setSiteLocked(locked: boolean) {
  await ensureSettingsTable();
  await sql`
    UPDATE site_settings SET site_locked = ${locked} WHERE id = 1
  `;
  return locked;
}
