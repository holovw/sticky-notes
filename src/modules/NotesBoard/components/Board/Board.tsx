import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Note } from '../Note';

import { getNextIndexZ, restrict } from '../../utils';

import { DRAG_TYPE, MIN_NOTE_SIZING } from '../../constants';

import type { Note as NoteType, DragType } from '../../types'

import styles from './Board.module.scss';

interface DragState {
    type: DragType;
    id: string;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
}

interface BoardProps {
    notes: NoteType[];
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}

export function Board ({ notes, setNotes }: BoardProps) {
    const [dragState, setDragState] = useState<DragState | null>(null);
    const [isOverTrash, setIsOverTrash] = useState<boolean>(false);

    const boardRef = useRef<HTMLDivElement | null>(null);
    const trashRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!dragState) {
            return;
        }

        const onPointerMove = (event: PointerEvent) => {
            const board = boardRef.current;

            if (!board) {
                return;
            }

            const bounds = board.getBoundingClientRect();

            const dx = event.clientX - dragState.startX;
            const dy = event.clientY - dragState.startY;

            if (dragState.type === DRAG_TYPE.MOVE) {
                setNotes(notes.map((note) => {
                    if (note.id !== dragState.id) {
                        return note;
                    }

                    return {
                        ...note,
                        x: restrict(dragState.initialX + dx, 0, Math.max(0, bounds.width - note.width)),
                        y: restrict(dragState.initialY + dy, 0, Math.max(0, bounds.height - note.height)),
                    }
                }));

                const trashBounds = trashRef.current?.getBoundingClientRect();
                if (trashBounds) {
                    setIsOverTrash(
                        event.clientX >= trashBounds.left &&
                        event.clientX <= trashBounds.right &&
                        event.clientY >= trashBounds.top &&
                        event.clientY <= trashBounds.bottom
                    );
                }
            }

            if (dragState.type === DRAG_TYPE.RESIZE) {
                setNotes(notes.map((note) => {
                    if (note.id !== dragState.id) {
                        return note;
                    }

                    return {
                        ...note,
                        width: restrict(dragState.initialWidth + dx, MIN_NOTE_SIZING.WIDTH, bounds.width - note.x),
                        height: restrict(dragState.initialHeight + dy, MIN_NOTE_SIZING.HEIGHT, bounds.height - note.y),
                    }
                }));
            }
        };

        const onPointerUp = () => {
            if (dragState.type === DRAG_TYPE.MOVE && isOverTrash) {
                setNotes(notes.filter(note => note.id !== dragState.id));
            }

            setIsOverTrash(false);
            setDragState(null);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, [notes, dragState, isOverTrash, setNotes]);

    const liftNote = (noteId: string) => {
        const nextIndexZ = getNextIndexZ(notes);
        setNotes(notes.map(note => (note.id === noteId) ? { ...note, zIndex: nextIndexZ } : note));
    };

    const dragNote = (event: React.PointerEvent, type: DragType, note: NoteType) => {
        liftNote(note.id);
        setDragState({
            type,
            id: note.id,
            startX: event.clientX,
            startY: event.clientY,
            initialX: note.x,
            initialY: note.y,
            initialHeight: note.height,
            initialWidth: note.width,
        });
    };

    const updateNoteText = useCallback((noteId: string, text: string) => {
        setNotes((prev) => prev.map(note => note.id === noteId ? { ...note, text } : note));
    }, [setNotes]);

    return (
        <div ref={boardRef} className={styles.container}>
            {notes.map(note => (
                <Note
                    key={note.id}
                    isDragging={dragState?.id === note.id && dragState?.type === DRAG_TYPE.MOVE}
                    note={note}
                    drag={dragNote}
                    updateText={updateNoteText}
                />
            ))}

            <div ref={trashRef} className={clsx(styles.trash, isOverTrash && styles.trashActive)}>Trash</div>
        </div>
    );
}
