import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Board, Toolbar } from './components';
import { noteService } from './services'
import { getNextIndexZ } from './utils';
import { type NOTE_COLOR, DEFAULT_NOTE_SIZING } from './constants';
import type { Note } from './types';

import styles from './NotesBoard.module.scss';

export function NotesBoard() {
    const [notes, setNotes] = useState<Note[]>(noteService.get());

    useEffect(() => {
        noteService.set(notes);
    }, [notes]);

    const createNote = useCallback((color: NOTE_COLOR) => {
        const nextIndexZ = getNextIndexZ(notes);
        const newNote: Note = {
            id: uuidv4(),
            x: 100,
            y: 100,
            width: DEFAULT_NOTE_SIZING.WIDTH,
            height: DEFAULT_NOTE_SIZING.HEIGHT,
            text: '',
            zIndex: nextIndexZ,
            color,
        };

        setNotes([...notes, newNote]);
    }, [notes, setNotes]);

    return (
        <div className={styles.container}>
            <Toolbar onCreate={createNote} />
            <Board notes={notes} setNotes={setNotes} />
        </div>
    );
}
