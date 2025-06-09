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
        return '#E57373';
      case Color.Orange:
        return '#FFB74D';
      case Color.Yellow:
        return '#FFF176';
      case Color.Green:
        return '#81C784';
      case Color.Teal:
        return '#4DB6AC';
      case Color.Cyan:
        return '#4DD0E1';
      case Color.Blue:
        return '#64B5F6';
      case Color.Purple:
        return '#BA68C8';
      case Color.Black:
        return '#333333';
      case Color.Gray:
        return '#B0BEC5';
      case Color.White:
        return '#FAFAFA';
      default:
        return '#333333';
    }
  }
}
