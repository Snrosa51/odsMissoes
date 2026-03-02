// main.js (adicione no topo)
const API_BASE = ""; // mesmo domínio (local + Railway)

async function apiFetch(path, options = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  const seedRoutes = require("./routes/seedRoutes");
app.use("/admin", seedRoutes);

  try {
    const resp = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: ctrl.signal,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    });
    return resp;
  } finally {
    clearTimeout(t);
  }
}