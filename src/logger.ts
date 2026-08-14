/**
 * Logger interface compatible with the AWS SDK `logger` client option,
 * extended with child() for module-prefixed sub-loggers.
 */
export interface SdkLogger {
    debug (...args: unknown[]): void;
    info (...args: unknown[]): void;
    warn (...args: unknown[]): void;
    error (...args: unknown[]): void;
    child? (prefix: string): SdkLogger;
}
