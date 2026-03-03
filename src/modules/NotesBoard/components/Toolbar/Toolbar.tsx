import { useState } from 'react';
import clsx from 'clsx';

import { NOTE_COLORS_MAP, NOTE_COLORS, type NOTE_COLOR } from '../../constants';

import styles from './Toolbar.module.scss';

interface ToolbarProps {
    onCreate: (color: NOTE_COLOR) => void;
}

export function Toolbar({ onCreate }: ToolbarProps) {
    const [currentColor, setCurrentColor] = useState(NOTE_COLORS.yellow);
    return (
        <div className={styles.container}>
            {Object.entries(NOTE_COLORS_MAP).map(([colorName, colorValue]) => (
                <button
                    key={colorName}
                    style={{backgroundColor: colorValue}}
                    className={clsx(styles.colorButton, currentColor === colorName && styles.colorButton__active)}
                    onClick={() => setCurrentColor(colorName)}
                />
            ))}

            <button
                className={clsx(styles.createButton)}
                onClick={() => onCreate(currentColor)}
            >
                +
            </button>
        </div>
    );
}
