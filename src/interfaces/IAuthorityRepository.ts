import { IAuthority } from "../model/schemas/authority.schema";
import { Authority } from "../model/authority.entities";
import { IAirport } from "../model/schemas/airport.schema";
import { Airport } from "../model/airport.entities";
import { Schedule } from "../model/schedule.entity";
import { ISchedule } from "../model/schemas/schedule.schema";
import { Search } from "../model/search.entity";
import { IFlightChart } from "../model/schemas/chartflight.schema";
import { FlightInstance } from "../model/FlightInstance.entities";

export interface IAuthorityRepository {
  findOne(email: string): Promise<IAuthority | null>;
  addAirport(data:Airport):Promise<IAirport | null>;
  AirportfindByIdAndUpdate(id: string, values: string): Promise<IAirport | null>;
  suspendAirport(id: string): any
  getAirports(limit:Number,page:Number):any
  addSchedule(values:Schedule):Promise<ISchedule | null>;
  getSchedules(from:string,to:string):Promise<ISchedule[] |ISchedule | null>;
  getAvailableSchedules():Promise<ISchedule[] |ISchedule | null>;
  scheduleFindByIdandUpdate(id:string,data:Schedule):Promise<ISchedule | null>;
  getSearchSchedules(data:Search):Promise<IFlightChart[] |IFlightChart | null>;
  scheduleByAirlineId(id:string):Promise<ISchedule[] |ISchedule | null>;
  suspendSchedule(field:string,id:string):any
  createFlightChart(flightChartData:FlightInstance):Promise<IFlightChart | null>;
  findById(id:string):Promise<IFlightChart | null>
  updateSeatConfirmation(data:{flightChartId:string,seats:any}):Promise<IFlightChart | null>
}
