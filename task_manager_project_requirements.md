# Personal Task Manager — Requirements & Design

> A single, downloadable markdown that contains feature lists, system design patterns, architecture notes, testing and deployment guidance, and resume-ready descriptions for a personal Task Management application.

---

## Table of contents

1. Product overview
2. Feature list (core → advanced)
3. UX & client platforms
4. Data & persistence considerations
5. System design & backend patterns to implement
6. Reliability, scaling & infra patterns
7. Security & privacy
8. Testing strategy
9. CI/CD, deployment & local-dev
10. Developer experience & project hygiene
11. Resume bullets & README outline
12. Acceptance criteria & success metrics

---

## 1. Product overview

A personal task manager (single-user-first) with projects, tasks, subtasks, tags, dependencies, reminders (email/SMS/WhatsApp/push), calendar & kanban views, analytics/reporting, and optional collaboration for invited people. Minimalistic UI with cross-platform clients (web, mobile, desktop). Monolithic backend (Express.js) with background worker(s) for reminders and report generation.

Goal: Build a robust, production-minded project that demonstrates full-stack skills, clean architecture, and operational thinking — résumé-worthy and extensible.

---

## 2. Feature list

### Core (MVP)

- User authentication: register, login, JWT access tokens + rotating refresh token support
- User profile: name, email, timezone, phone, notification preferences
- Projects: create, edit, archive, list
- Tasks: CRUD (title, description, start date, due date, priority, status, estimate)
- Subtasks: hierarchical tasks with parent/child
- Tags: create, color, attach/detach
- Task dependencies: finish-to-start as a default
- Filters: by project, tag, status, priority, date range
- Calendar view: day/week/month
- Basic dashboard: Today / Upcoming / Overdue / Completed
- Reminders: schedule one-off reminders; delivery via email (MVP)
- Background worker: reliable scheduler for reminders
- Audit/activity log: task created/updated/deleted entries

### Important quality-of-life features

- Search (title/description/tags)
- Quick-add command (natural language parsing for quick entry)
- Keyboard shortcuts for power users
- Duplicate task / templates
- Local time zone conversion (store UTC + timezone-aware UI)

### Collaboration (advanced)

- Project invites (email invite + join link)
- Project roles: owner, editor, commenter, viewer
- Shared tasks visible in all members' calendars
- Real-time updates (WebSocket/Socket.io) for live collaboration
- Comments on tasks (threaded), file attachments, mentions
- Permission enforcement at API level

### Notifications & Reminders (advanced)

- Multiple channels per user: email, push (web/mobile), SMS, WhatsApp
- Custom reminder times (absolute and relative — e.g., 30 min before) and recurring reminders
- Notification preferences and fallback order (e.g., WhatsApp → SMS → Email)
- Digest emails and daily/weekly summary options
- Retry & exponential backoff for failed sends
- Delivery logs, receipts & click tracking for emails

### Productivity & Reporting (advanced)

- Recurring tasks (daily, weekly, monthly, custom rrule)
- Time tracking & Pomodoro integration (optional timer per task)
- Productivity reports: completed tasks per day/week/month, completion rate, average time-to-complete, focus metrics
- Export: CSV / PDF reports, shareable report links (S3 or signed URLs)
- Goal setting & milestones

### Integrations & Extensibility

- Google Calendar two-way sync (OAuth) (opt-in)
- Import/Export CSV and iCal
- Webhooks for integrations (task created/updated events)
- Zapier/IFTTT or a simple automation webhook endpoint

### Admin & internal (for development)

- Admin dashboard (internal): user list, feature toggles, manual job rerun, logs viewer
- Feature flags (DB-driven) to enable/disable experimental features

---

## 3. UX & Client platforms

- **Web**: React + TypeScript, TailwindCSS for minimal UI; responsive design
- **Mobile**: React Native (Expo) for Android + iOS (share business logic where possible)
- **Desktop**: Tauri wrapper for packaged web app (small binary)
- **Widgets**: Android native widget (optional, later)

UI considerations:

- Minimalism: whitespace, small micro-interactions, accessible color contrast
- Offline-friendly basics: allow quick adds offline and sync when online
- Accessibility (a11y): keyboard navigation, ARIA attributes, scalable fonts

---

## 4. Data & persistence considerations

- **Single relational database (MySQL)** as primary store
- Important tables/entities (conceptual, not SQL): users, projects, project\_members, tasks, subtasks (or parent relationship), task\_tags, tags, reminders, notifications\_log, activity\_log, reports
- Store all timestamps in UTC; store user timezone in `users.timezone` and convert on UI
- Use **soft deletes** for user-deleted entities (e.g., `deleted_at`) to allow undo/recovery
- Design for **auditability**: activity logs, who changed what and when
- Store reminder records with intended UTC `remind_at` and channel preferences
- For file storage (attachments, report PDFs): use S3-compatible storage or local storage for MVP

Indexing & query patterns:

- Index columns used in filters and sorting (e.g., `created_by`, `due_at`, `status`, `project_id`)
- Consider composite indexes for frequent multi-column filters (e.g., `created_by, status, due_at`)
- Use pagination (cursor-based preferred) for lists

Data retention and backups:

- Daily DB backups (snapshot)
- Retention policy for notification logs (e.g., 6 months)

---

## 5. System design & backend patterns to implement

### Architectural style

- **Modular monolith**: single deployable app organized into feature modules (users, tasks, projects, reminders, reports). Modules interact via well-defined services.

### Patterns to implement

- **Repository pattern**: isolate SQL/DB access behind repositories per entity/module
- **Service layer**: business logic lives in services; controllers only handle HTTP concerns
- **Controller/Route decorator + registry**: use decorators to declare routes and auto-register them. This keeps routing declarative and testable.
- **Dependency injection (lightweight)**: centralize creation of shared instances (db client, cache, logger)
- **Unit of Work / Transaction wrapper**: provide a simple transaction helper for operations spanning multiple repos
- **Decorator pattern (for services)**: use decorators for cross-cutting concerns (logging, timing, retries, validation)
- **Command pattern** for scheduled jobs / worker tasks: treat jobs as commands with execute/rollback semantics
- **Event-driven internal hooks**: publish domain events within the app (in-process event bus) for decoupling (e.g., TaskCompleted → produce activity record + enqueue report)
- **Circuit Breaker & Retry**: apply when calling external services (Twilio, SendGrid)
- **Idempotency keys**: for endpoints that can be retried (webhooks, payment endpoints)
- **Caching pattern**: use read-through cache for expensive reads (Redis) and cache invalidation patterns
- **CQRS (optional & advanced)**: separate read models from write models for complex reporting or very heavy read workloads
- **Saga pattern (optional)**: handle long-running multi-step processes (complex collaboration flows) if needed

### Design constraints and guidance

- Keep base/core classes minimal and focused: base repository (common CRUD helpers), base service (common validation), base controller (error handling wrapper)
- Avoid over-abstracting repositories: prefer explicit query functions per repo for clarity
- Use a small `RouteRegistry` that scans decorated controller classes and registers routes at startup
- Prefer composition over inheritance for services where possible

---

## 6. Reliability, scaling & infra patterns

- **Background workers**: separate process (or same monolith worker module) for scheduled tasks and reminders; use a job queue (Redis + Bull/BullMQ) for delayed and retryable jobs
- **Horizontal scaling**: stateless API nodes + shared DB/Redis; use load balancer when needed
- **Connection pooling** for DB
- **Caching**: Redis for frequently-read user preferences, tag lists; TTLs for transient data
- **Throttling & rate-limiting**: per-user rate limits for expensive endpoints
- **Health checks & metrics**: readiness/liveness endpoints, prometheus metrics
- **Observability**: structured logs, request traces (OpenTelemetry), and alerts
- **Backpressure & graceful shutdown**: worker drains queue and completes inflight jobs on shutdown

---

## 7. Security & privacy

- Store passwords hashed with a strong algorithm (bcrypt/argon2)
- Short-lived access JWTs + rotating refresh tokens stored hashed in DB
- Protect sensitive endpoints with role checks
- Input validation & sanitization to prevent SQL injection & XSS
- Rate-limiting + IP throttling to prevent abuse
- TLS for all communications (HTTPS + secure cookies if used)
- Secrets management (environment variables or secret manager)
- Audit logs for critical admin actions
- Data deletion & export procedures (GDPR-friendly behavior if needed)

---

## 8. Testing strategy

- **Unit tests**: services and repositories (mock DB layer) — essential for business logic
- **Integration tests**: run against a test database (docker-compose) for repository behavior and routes
- **E2E tests**: critical flows (auth, task create → reminder → notification) using a headless browser or API tests
- **Contract tests**: if any part of the system uses internal message contracts, validate them
- **Worker tests**: test job handlers with job payloads and assert DB changes / side effects

---

## 9. CI/CD, deployment & local-dev

- **Local dev**: Docker Compose with MySQL, Redis, Worker, and Node app; seed scripts for test accounts
- **CI**: run lint, tests, build artifacts, and produce Docker image
- **CD**: push docker image to registry; deploy to host (DigitalOcean App Platform, Fly, or AWS ECS)
- **Monitoring**: integrate basic alerts (CPU, memory, queue length)
- **Migrations**: use a schema migration tool (Flyway, knex, Prisma Migrate) and include migrations in CI

---

## 10. Developer experience & project hygiene

- Use TypeScript (strict mode) for backend and frontend
- Enforce linting and formatting (ESLint + Prettier) with pre-commit hooks (Husky)
- Keep small files (single responsibility); target 50–200 LOC per file
- Document conventions (naming, error handling, logging) in CONTRIBUTING.md
- Provide seeded dev data and simple `dev:reset` script
- Use environment-specific configs and `.env.example`

##
