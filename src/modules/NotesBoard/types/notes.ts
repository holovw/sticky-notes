import type { NOTE_COLOR } from '../constants';

export interface Note {
    id: string
    x: number
    y: number
    width: number
    height: number
    text: string
    zIndex: number
    color: NOTE_COLOR;
}
