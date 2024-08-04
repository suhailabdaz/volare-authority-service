import { IAuthorityRepository } from "../interfaces/IAuthorityRepository";
import AuthorirtyModel, { IAuthority } from "../model/schemas/authority.schema";
import { Authority } from "../model/authority.entities";
import AirportModel,{IAirport} from "../model/schemas/airport.schema";
import { Airport } from "../model/airport.entities";
import ScheduleModel, { ISchedule } from "../model/schemas/schedule.schema";
import { Schedule } from "../model/schedule.entity";

export class AuthorityRepository implements IAuthorityRepository {



  async findOne(name: string): Promise<IAuthority | null> {
    try {
      const user = await AuthorirtyModel.findOne({ name });
      return user;
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async addAirport(data:Airport): Promise<IAirport | null> {
    try {
      return AirportModel.create(data)
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async AirportfindByIdAndUpdate(id: string, values:any): Promise<IAirport | null> {
    try {
      const Airport = await AirportModel.findByIdAndUpdate(id, values,{ new: true, runValidators: true } );
      return Airport;
    } catch (e: any) {
      throw new Error("db error");
    }
  }
  async  deleteAirport(id: string){
    try {
      const Airport = await AirportModel.deleteOne({_id:id});
      return Airport;
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async  getAirports(){
    try {
      const Airports = await AirportModel.find()
      return Airports;
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async addSchedule(values:Schedule): Promise<ISchedule | null> {
    try {
      return ScheduleModel.create(values)
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async getSchedules(from:string,to:string):Promise<ISchedule[]|ISchedule | null>{
    try {
      const schedules = await ScheduleModel.find({
        fromAirport_Id: from,
        toAirport_Id: to,
      });
      return schedules;
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async getAvailableSchedules():Promise<ISchedule[]|ISchedule | null>{
    try {
      const schedules = await ScheduleModel.find({
        available:true
      });
      return schedules;
    } catch (e: any) {
      throw new Error("db error");
    }
  }


}
