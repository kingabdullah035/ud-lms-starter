# Architecture

```mermaid
flowchart LR
  Browser[Next.js App Router (React)] -- fetch --> API[(Next.js Route Handlers /api/*)]
  API --> DB[(Supabase / Postgres)]
  API --> Storage[(Vercel Blob / S3) for files & videos]
  API --> Runner[[Code Runner Service]]:::runner

classDef runner fill:#dfe,stroke:#090,stroke-width:2px;
```
