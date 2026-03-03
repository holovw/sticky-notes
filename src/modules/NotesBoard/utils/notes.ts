import type { Note } from '../types';

export const getNextIndexZ = (notes: Note[]) => {
    const maxIndex = notes.reduce((acc, note) => Math.max(acc, note.zIndex), 0);
    return maxIndex + 1;
}