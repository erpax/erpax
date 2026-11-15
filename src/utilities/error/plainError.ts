/**
 * An Error as JSON. `JSON.stringify` drops an Error's name, message and stack (they are not
 * enumerable), so the Worker's logger wrote every error as `"err":{}` and production failures were
 * invisible. This spells them out, with the cause; any other value passes through unchanged.
 */
export const plainError = (value: unknown): unknown =>
  value instanceof Error
    ? {
        name: value.name,
        message: value.message,
        stack: value.stack,
        ...(value.cause === undefined ? {} : { cause: plainError(value.cause) }),
      }
    : value
