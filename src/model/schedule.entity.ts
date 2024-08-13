
export class Schedule {
  constructor(
    public readonly _id:string,
    public readonly fromAirport_Id: string,
    public readonly toAirport_Id: string,
    public readonly arrivalTime: string,
    public readonly duration: string,
    public readonly departureTime: string,
    public readonly daysOfWeek: string[],
    public readonly status: boolean = true,
    public readonly available: boolean = true,
    public readonly flightId?: string,
    public readonly airlineId?: string,
    public readonly economyPrice?: number,
    public readonly bussinessPrice?: number,
    public readonly firstclassPrice?: number,
    public readonly premiumIncrement?: number,
    public readonly weekendIncrement?: number,
    public readonly scheduleStatus?:string,
  ) {}
}
