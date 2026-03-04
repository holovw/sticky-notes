import React, { useState } from 'react';
import clsx from 'clsx';

import type { DragType, Note as NoteType } from '../../types';
import { NOTE_COLORS_MAP, DRAG_TYPE } from '../../constants';

import ResizeHandleSVG from '../../../../assets/resize-handle.svg?react';

import styles from './Node.module.scss';

interface NoteProps {
    isDragging: boolean;
    note: NoteType;
    drag: (event: React.PointerEvent, type: DragType, note: NoteType) => void;
    updateText: (noteId: string, text: string) => void;
}

export const Note = React.memo(function ({ isDragging, note, drag, updateText }: NoteProps) {
    const [draftText, setDraftText] = useState(note.text);

    return (
        <div
            className={clsx(styles.container, isDragging && styles.dragging)}
            style={{
                width: note.width,
                height: note.height,
                left: note.x,
                top: note.y,
                backgroundColor: NOTE_COLORS_MAP[note.color],
                zIndex: note.zIndex
            }}
            onPointerDown={(event) => drag(event, DRAG_TYPE.MOVE, note)}
        >
            <textarea
                name="note-text"
                value={draftText}
                className={styles.textArea}
                placeholder="Write your note"
                onPointerDown={(event) => event.stopPropagation()}
                onChange={(e) => setDraftText(e.target.value)}
                onBlur={() => updateText(note.id, draftText)}
            />
            <button
                title="Resize note"
                className={styles.resizeButton}
                onPointerDown={(event) => {
                    event.stopPropagation();
                    drag(event, DRAG_TYPE.RESIZE, note);
                }}
            >
                <ResizeHandleSVG className={styles.resizeIcon}/>
            </button>
        </div>
    );
});
