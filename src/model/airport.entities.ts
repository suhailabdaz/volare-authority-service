// Define the Coordinates interface
interface Coordinates {
  lat: number;
  long: number;
}

export class Airport {
  constructor(
    public readonly airport_name: string,
    public readonly airport_code: string,
    public readonly city: string,
    public readonly country: string,
    public readonly coordinates: Coordinates, 
    public readonly status: boolean 
  ) {}
}
