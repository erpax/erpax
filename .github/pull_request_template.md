## Description

<!-- Describe your changes -->

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Checklist

- [ ] I have run `pnpm check` (standards + lint + typecheck + tests) and it passes
- [ ] I have tested my changes locally
- [ ] My code follows the project's style guidelines
- [ ] I have made corresponding changes to the documentation (if applicable)

## Standards (per [`docs/STANDARDS.md`](../docs/STANDARDS.md) and [`CONTRIBUTING.md`](../CONTRIBUTING.md))

- [ ] `pnpm standards:check` passes (no malformed `@standard` / `@rfc` / `@compliance` / `@accounting` / `@security` / `@audit` / `@quality` tags)
- [ ] New files that implement or use a standard carry a JSDoc banner with the right tags
- [ ] If this PR adds a new `src/standards/<id>/` folder: README + implementation + barrel re-export + matching `tests/standards/<id>/` + audit-doc rows are all present
- [ ] If this PR relocates standards code, the old location either has a `@deprecated` re-export shim or is queued in `scripts/slice-f-delete-dead-stubs.sh`

## Testing

<!-- Describe how you tested your changes -->

- [ ] Unit/integration tests pass
- [ ] E2E tests pass (if applicable)
- [ ] Tested on staging environment

## Screenshots (if applicable)

<!-- Add screenshots to help explain your changes -->

## Additional Notes

<!-- Any additional information that reviewers should know -->
