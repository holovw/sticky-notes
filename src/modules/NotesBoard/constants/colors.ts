export const NOTE_COLORS = {
  yellow: 'yellow',
  pink: 'pink',
  blue: 'blue',
  green: 'green',
  orange: 'orange',
  purple: 'purple',
}

export type NOTE_COLOR = typeof NOTE_COLORS[keyof typeof NOTE_COLORS];

export const NOTE_COLORS_MAP: Record<NOTE_COLOR, string> = {
  [NOTE_COLORS.yellow]: '#FFF475',
  [NOTE_COLORS.pink]: '#FFB3C7',
  [NOTE_COLORS.blue]: '#A7D8FF',
  [NOTE_COLORS.green]: '#B8F2C8',
  [NOTE_COLORS.orange]: '#FFD6A5',
  [NOTE_COLORS.purple]: '#D7C6FF',
};
