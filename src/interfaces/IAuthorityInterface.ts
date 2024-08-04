import { Authority } from "../model/authority.entities";

export interface IAuthorityService {

  login(data:{name: string, password: string}): any;
  addAirport(data:{
    airport_code :string,
    airport_name :string,
    city : string,
    country:string
  }):any
  saveAirport(airportData:any):any
  deleteAirport(id:string):any
  getAirports():any
  addSchedule(values:any):any
  getSchedules(data:{from:string,to:string}):any
  getAvailableSchedules():any
}
