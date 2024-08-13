import { Airport } from "../model/airport.entities";
import { Authority } from "../model/authority.entities";
import { Flight } from "../model/flight.entities";
import { Schedule } from "../model/schedule.entity";
import { ISchedule } from "../model/schemas/schedule.schema";
import { Search } from "../model/search.entity";

export interface IAuthorityService {

  login(data:{name: string, password: string}): any;
  addAirport(data:Airport):any
  saveAirport(airportData:any):any
  deleteAirport(id:string):any
  getAirports(data:{limit:Number,page:Number}):any
  addSchedule(values:any):any
  getSchedules(data:{from:string,to:string}):any
  getAvailableSchedules():any
  saveSchedule(data:Schedule):any
  searchSchedule(data:Search):any
  airlineSchedule(id:string):any
  suspendSchedule(id:string):any
  scheduleCharting(data:{schedule:Schedule,flight:Flight}):any
}
