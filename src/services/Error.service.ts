interface ErrorServiceInterface {
    error(e: unknown): void;
    warning(): void;
}

// TODO: integrate logging service
class ErrorService implements ErrorServiceInterface {
    log(message: string): void {
        console.log(message);
    }

    error(e: unknown) {
        if (e instanceof Error) {
            this.log(`Error: ${e.message}`);
        }
    }

    warning() {
        this.log('Warning!');
    }
}

export const errorService = new ErrorService();
