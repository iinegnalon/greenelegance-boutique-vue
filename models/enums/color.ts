export enum Color {
  Red = 'Red',
  Orange = 'Orange',
  Yellow = 'Yellow',
  Green = 'Green',
  Teal = 'Teal',
  Cyan = 'Cyan',
  Blue = 'Blue',
  Purple = 'Purple',
  Black = 'Black',
  Gray = 'Gray',
  White = 'White',
}

export namespace Color {
  export function toHex(color: Color) {
    switch (color) {
      case Color.Red:
        return '#FF0000';
      case Color.Orange:
        return '#FFA500';
      case Color.Yellow:
        return '#FFFF00';
      case Color.Green:
        return '#008000';
      case Color.Teal:
        return '#008080';
      case Color.Cyan:
        return '#00FFFF';
      case Color.Blue:
        return '#0000FF';
      case Color.Purple:
        return '#800080';
      case Color.Black:
        return '#000000';
      case Color.Gray:
        return '#808080';
      case Color.White:
        return '#FFFFFF';
      default:
        return '#000000';
    }
  }
}
