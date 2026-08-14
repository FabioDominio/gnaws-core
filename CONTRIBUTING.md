# Contributing to @gnaws/core

Thank you for your interest in contributing!

## Branches

- `main` — stable, tagged releases only. Never push directly.
- `dev` — integration branch. Target this branch for all PRs.
- Feature branches — create from `dev`, name them `feat/your-thing` or `fix/your-thing`.

```
your-branch  →  PR  →  dev  →  (release PR)  →  main
```

Hotfixes for critical bugs branch from `main` directly:

```
hotfix/critical-bug  →  PR  →  main  (tagged immediately)
                     →  also merged into dev to stay in sync
```

## Workflow

1. Fork the repo
2. Create a branch from `dev`:
   ```bash
   git checkout dev
   git checkout -b feat/your-feature
   ```
3. Make your changes — commit style is your choice, we'll clean up at merge time
4. Open a PR targeting `dev`
5. Describe **what** you changed and **why**

We squash small PRs and use merge commits for larger features with meaningful history.
No need to rebase or squash before opening a PR.

## Commit messages (for your own commits)

We use [Conventional Commits](https://www.conventionalcommits.org):

```
feat: add support for ElastiCache Serverless
fix: correctly filter RECURSIVE resolver rules
docs: update detection rules table
chore: bump @aws-sdk dependencies
```

## Development setup

```bash
git clone git@github.com:FabioDominio/gnaws-core.git
cd gnaws-core
npm install
npm run build
npm run test
```

## Adding a detection rule

1. Create `src/detection/rules/yourResource.ts` implementing `DetectionRule`
2. Register it in `src/detection/rules/index.ts`
3. Add tests in `tests/unit/detection/`
4. Document it in the `README.md` rules table

## Adding a new AWS service

1. Add the interface in `src/interfaces/yourService.ts`
2. Implement the live provider in `src/providers/live/yourService.ts`
3. Implement the cache provider in `src/providers/cache/yourService.ts`
4. Add cache service tests in `tests/unit/providers/cache/`
5. Add live service tests in `tests/unit/providers/live/`
6. Register in `src/serviceFactory.ts` and `src/inventory.ts`
7. Wire into `src/graphBuilder.ts`

## Code style

- TypeScript strict mode
- ESLint enforced — run `npm run lint` before pushing
- No `any` without a comment explaining why

## License

By contributing you agree your code is licensed under AGPL-3.0.
