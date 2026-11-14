/**
 * competencyLineField — the ONE competency-line definition, reused.
 *
 * The actor-merge made literal: a "held" line (what a user/agent/employee
 * carries) and a "required" line (what a job demands) are the SAME shape
 * around one competency CONTENT-ADDRESS — the `competency` is the SKILL.md
 * route into the corpus (services/skill-router/competencies), not a row in a
 * `competencies` collection. Same shape, composed everywhere (Users, Employees,
 * JobPositions); held vs required is a `mode`, not a second definition.
 *
 * @standard SFIA 8 proficiency-levels
 * @standard ISO 30405:2016 essential-vs-desirable (mandatory flag)
 * @see ../../services/skill-router/competencies (the computed catalogue — skills ARE competencies)
 */
import type { Field } from 'payload'
