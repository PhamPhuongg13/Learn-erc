import path from "node:path";
import fs from "node:fs";

// Shared defaults for Vite and standalone Wrangler commands. Managed Linux
// supplies its own checkout-local paths before these defaults are applied.
export function configureToolEnvironment(projectRoot) {
  const runtimeRoot =
    process.env.SITES_RUNTIME_ROOT || path.join(projectRoot, ".sites-runtime");

  // Fix macOS permission issue: when TMPDIR points to a root/system daemon path like /var/folders/zz/
  // Miniflare crashes with EACCES. Ensure TMPDIR is writable.
  const tmpDir = path.join(runtimeRoot, "tmp");
  try {
    fs.mkdirSync(tmpDir, { recursive: true });
    process.env.TMPDIR = tmpDir;
  } catch {
    process.env.TMPDIR = "/tmp";
  }

  const defaults = {
    CLOUDFLARE_CF_FETCH_ENABLED: "false",
    WRANGLER_SEND_METRICS: "false",
    WRANGLER_WRITE_LOGS: "false",
    WRANGLER_LOG_PATH: path.join(runtimeRoot, "wrangler/logs"),
    WRANGLER_REGISTRY_PATH: path.join(runtimeRoot, "wrangler/dev-registry"),
    MINIFLARE_REGISTRY_PATH: path.join(runtimeRoot, "wrangler/registry"),
  };
  for (const [name, value] of Object.entries(defaults)) {
    process.env[name] ??= value;
  }
}
