import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000;
const startedAt = new Date();

app.get('/', (_req: Request, res: Response) => {
  const uptime = Math.floor((Date.now() - startedAt.getTime()) / 1000);
  const uptimeStr = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`;
  res.send(`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TypeScript Express API</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 40px; max-width: 520px; width: 90%; box-shadow: 0 25px 50px rgba(0,0,0,0.4); }
    .badge { display: inline-block; background: #22c55e20; color: #22c55e; border: 1px solid #22c55e40; border-radius: 999px; padding: 4px 12px; font-size: 12px; font-weight: 600; margin-bottom: 24px; }
    h1 { font-size: 24px; font-weight: 700; color: #f1f5f9; margin-bottom: 8px; }
    p { color: #94a3b8; font-size: 14px; margin-bottom: 28px; }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
    .stat { background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 16px; }
    .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .stat-value { font-size: 18px; font-weight: 600; color: #f1f5f9; }
    .endpoints { border-top: 1px solid #334155; padding-top: 20px; }
    .endpoints-title { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .endpoint { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #1e293b; }
    .method { background: #3b82f620; color: #60a5fa; border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; font-family: monospace; }
    .path { color: #cbd5e1; font-size: 13px; font-family: monospace; flex: 1; }
    .desc { color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">● Running</div>
    <h1>TypeScript Express API</h1>
    <p>Node.js + Express + TypeScript で構築された API サーバーです。</p>
    <div class="stats">
      <div class="stat">
        <div class="stat-label">Uptime</div>
        <div class="stat-value">${uptimeStr}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Port</div>
        <div class="stat-value">${PORT}</div>
      </div>
    </div>
    <div class="endpoints">
      <div class="endpoints-title">Endpoints</div>
      <div class="endpoint">
        <span class="method">GET</span>
        <span class="path">/</span>
        <span class="desc">このページ</span>
      </div>
      <div class="endpoint">
        <span class="method">GET</span>
        <span class="path">/health</span>
        <span class="desc">ヘルスチェック</span>
      </div>
    </div>
  </div>
</body>
</html>`);
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
