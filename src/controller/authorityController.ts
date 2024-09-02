import { IAuthorityService } from "../interfaces/IAuthorityInterface"
import { Airport } from "../model/airport.entities";
import { Flight } from "../model/flight.entities";
import { Schedule } from "../model/schedule.entity";
import { ISchedule } from "../model/schemas/schedule.schema";
import { Search } from "../model/search.entity";

export class AuthorityController {
  private service: IAuthorityService;

  constructor(service: IAuthorityService) {
    this.service = service;
  }
 


  login = async (data : {name:string,password:string}) => {
    try {
      const response = await this.service.login(data);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  addAirport = async(data :Airport)=>{
    try{
      const response = await this.service.addAirport(data);
      return response;
    }catch (e: any) {
      console.log(e);
    }
  }

  saveAirport = async(airportData:any)=>{
    try{
        const response = await this.service.saveAirport(airportData)
        return response
    }catch(e:any){
      console.error(e)
    }
} 
  deleteAirport = async(id:string)=>{
  try{
      const response = await this.service.deleteAirport(id)
      return response
  }catch(e:any){
    console.error(e)
  }





  
  
}
getAirports = async(data:{limit:Number,page:number})=>{
  try{
      const response = await this.service.getAirports(data)
      return response
  }catch(e:any){
    console.error(e)
  }
}

addSchedule = async(values:any)=>{
  try{
      const response = await this.service.addSchedule(values)
      return response
  }catch(e:any){
    console.error(e)
  }
}
getSchedules = async(data:{from:string,to:string})=>{
  try{
      const response = await this.service.getSchedules(data)
      return response
  }catch(e:any){
    console.error(e)
  }
}

searchSchedules = async(data:Search)=>{
  try{
      const response = await this.service.searchSchedule(data)
      return response
  }catch(e:any){
    console.error(e)
  }
}

updateBookingSeatConfirmation = async(data:{flightChartId:string,seats:any})=>{
  try{
      const response = await this.service.updateBookingSeatConfirmation(data)
      return response
  }catch(e:any){
    console.error(e)
  }
}

getFlight = async(id:string)=>{
  try{
      const response = await this.service.getFlight(id)
      return response
  }catch(e:any){
    console.error(e)
  }
}
airlineSchedule = async(id:string)=>{
  try{
      const response = await this.service.airlineSchedule(id)
      return response
  }catch(e:any){
    console.error(e)
  }
}

suspendSchedule = async(id:string)=>{
  try{
      const response = await this.service.suspendSchedule(id)
      return response
  }catch(e:any){
    console.error(e)
  }
}

getAvailableSchedules = async()=>{
  try{
      const response = await this.service.getAvailableSchedules()
      return response
  }catch(e:any){
    console.error(e)
  }
}
saveSchedule = async(data:Schedule)=>{
  try{
      const response = await this.service.saveSchedule(data)
      return response
  }catch(e:any){
    console.error(e)
  }
}

scheduleCharting = async(data:{schedule:Schedule,flight:Flight})=>{
  try{
      const response = await this.service.scheduleCharting(data)
      return response
  }catch(e:any){
    console.error(e)
  }
}

}
