import { IAuthority } from "../model/schemas/authority.schema";
import { Authority } from "../model/authority.entities";
import { IAirport } from "../model/schemas/airport.schema";
import { Airport } from "../model/airport.entities";
import { Schedule } from "../model/schedule.entity";
import { ISchedule } from "../model/schemas/schedule.schema";

export interface IAuthorityRepository {
  findOne(email: string): Promise<IAuthority | null>;
  addAirport(data:Airport):Promise<IAirport | null>;
  AirportfindByIdAndUpdate(id: string, values: string): Promise<IAirport | null>;
  deleteAirport(id: string): any
  getAirports():any
  addSchedule(values:Schedule):Promise<ISchedule | null>;
  getSchedules(from:string,to:string):Promise<ISchedule[] |ISchedule | null>;
}
