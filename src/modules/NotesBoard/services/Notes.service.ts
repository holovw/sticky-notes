import { localStorageService } from '../../../services';

import type { Note } from '../types';

export class NoteService {
    static ENTITY_KEY = 'sticky-notes';

    set(notes: Note[]): Note[] {
        localStorageService.setItem<Note[]>(NoteService.ENTITY_KEY, notes);

        return notes;
    }

    get(): Note[] {
        return localStorageService.getItem<Note[]>(NoteService.ENTITY_KEY) || [];
    }
}

export const noteService = new NoteService();
