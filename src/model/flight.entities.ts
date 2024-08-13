export class Flight {
  constructor(
    public readonly _id: string,
    public readonly seatLayout: {
      economyClass: Row[],
      businessClass: Row[],
      firstClass: Row[]
    },
    public readonly flight_code: string,
    public readonly manufacturer: string,
    public readonly economy_seats: number,
    public readonly business_seats: number,
    public readonly first_class_seats: number,
    public readonly airline_id: string,
    public readonly status: boolean,
  ) { }
}

interface Seat {
  number: string;
  position: 'window' | 'middle' | 'aisle';
  isAvailable: boolean;
}

interface Row {
  row: number;
  seats: Seat[];
}