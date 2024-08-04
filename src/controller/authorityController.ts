import { IAuthorityService } from "../interfaces/IAuthorityInterface"

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

  addAirport = async(data :{
    airport_code :string,
    airport_name :string,
    city : string,
    country:string
  })=>{
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
getAirports = async()=>{
  try{
      const response = await this.service.getAirports()
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
getAvailableSchedules = async()=>{
  try{
      const response = await this.service.getAvailableSchedules()
      return response
  }catch(e:any){
    console.error(e)
  }
}

}
