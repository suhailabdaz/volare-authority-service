import { IAuthorityService } from "../interfaces/IAuthorityInterface";
import { IAuthorityRepository } from "../interfaces/IAuthorityRepository";
import { Authority } from "../model/authority.entities";
import "dotenv/config";
import bcrypt from "bcryptjs";
import { MongoError } from "mongodb";


export class AuthorityService implements IAuthorityService {
  private repository: IAuthorityRepository;

  constructor(repository: IAuthorityRepository) {
    this.repository = repository;
  }



  async login(data:{name:string,password:string}) {
    const authority = await this.repository.findOne(data.name);
    if (!authority) {
      return { success: false, message: "Access Denied" };
    }
    if(!authority.password) {
      return { success: false, message: "Access Denied" };
    }
    const isPassword = await authority.comparePassword(data.password);
    if (!isPassword) {
      return { success: false, message: "Access Denied" };
    }
    const accessToken = authority.SignAccessToken();
    const refreshToken = authority.SignRefreshToken();
    return { success: true, message: "Access granted", authority,accessToken,refreshToken};
    
  }
  async addAirport(data: { airport_code: string; airport_name: string; city: string; country: string; }) {
      try{
          const airport = await this.repository.addAirport(data)
          return {success:true , airport:airport}
      }catch (error) {
        if (error instanceof Error) {
          return {success:false }
      }
      throw error;
      }
  }

  async  saveAirport(airportData: any) {
    try{
      const id = airportData._id
      const airport = await this.repository.AirportfindByIdAndUpdate(id,airportData)
      return {success:true,airport:airport}
  }catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error resending OTP: ${error.message}`);
  }
  throw error;
  }
  }
  async  deleteAirport(id: string) {
        try{
            const airport = await this.repository.deleteAirport(id)
            return {success:true,airport:id}
        }
        catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error resending OTP: ${error.message}`);
  }
  throw error;
  }
  }

  async  getAirports() {
    try{
        const airports = await this.repository.getAirports()
        return {success:true,airports:airports}
    }
    catch (error) {
if (error instanceof Error) {
  throw new Error(`Error resending OTP: ${error.message}`);
}
throw error;
}
}

async addSchedule(values:any) {
  try{
      const schedule = await this.repository.addSchedule(values)
      return {success:true , schedule:schedule}
  }catch (error) {
    if (error instanceof Error) {
      return {success:false }
  }
  throw error;
  }
}


async getSchedules(data:{from:string,to:string}) {
  try{
      const schedules = await this.repository.getSchedules(data.from,data.to)
      return {success:true , schedules:schedules}
  }catch (error) {
    if (error instanceof Error) {
      return {success:false }
  }
  throw error;
  }
}

async getAvailableSchedules() {
  try{
      const schedules = await this.repository.getAvailableSchedules()
      return schedules
  }catch (error) {
    
  throw error;
  }
}


}
