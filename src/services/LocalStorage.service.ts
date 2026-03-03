import { errorService } from './Error.service';

class LocalStorage {
    // eslint-disable-next-line
    cache: Map<string, any>;

    constructor() {
        this.cache = new Map();
    }

    setItem<Type>(key: string, data: Type): void {
        try {
            setTimeout(() => {
                localStorage.setItem(key, JSON.stringify(data));
                this.cache.set(key, data);
            }, 0);
        } catch (e: unknown) {
            errorService.error(e);
        }
    }

    getItem<Type>(key: string): Type | null {
        try {
            if (!this.cache.has(key)) {
                const data = localStorage.getItem(key);
                if (data) {
                    this.cache.set(key, JSON.parse(data));
                }
            }

            return this.cache.get(key);
        } catch (e: unknown) {
            errorService.error(e);
        }

        return null;
    }
}

export const localStorageService = new LocalStorage();
