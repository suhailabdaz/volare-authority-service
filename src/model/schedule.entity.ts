export class Schedule {
  constructor(
    public readonly fromAirport_Id : string,
    public readonly toAirport_Id: string,
    public readonly arrivalTime: string,
    public readonly duration: string,
    public readonly departureTime : string,
    public readonly daysOfWeek:Array<string>
  ) {}
}
