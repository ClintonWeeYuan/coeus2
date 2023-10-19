type ErrorName = "NO_USER_FOUND" | "INCORRECT_PASSWORD"

export class LoginError extends Error {
    name: ErrorName;
    message: string;
    cause: any;

    constructor({
        name, message, cause
                }: {
        name: ErrorName;
        message: string;
        cause?: any;
    }) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}