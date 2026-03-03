import { DRAG_TYPE } from '../constants';

export type DragType = (typeof DRAG_TYPE)[keyof typeof DRAG_TYPE]
