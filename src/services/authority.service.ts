import { IAuthorityService } from '../interfaces/IAuthorityInterface';
import { IAuthorityRepository } from '../interfaces/IAuthorityRepository';
import 'dotenv/config';
import { Schedule } from '../model/schedule.entity';
import { ISchedule } from '../model/schemas/schedule.schema';
import { Airport } from '../model/airport.entities';
import { Search } from '../model/search.entity';
import { Flight } from '../model/flight.entities';
import getHolidays from '../utils/getHolidays';
import calculateDynamicPrice from '../utils/calculatePrice';
import parseDuration from '../utils/parseDuration';
import { ScheduleStatus } from '../interfaces/enum.status';
import { FlightInstance } from '../model/FlightInstance.entities';

export class AuthorityService implements IAuthorityService {
  private repository: IAuthorityRepository;

  constructor(repository: IAuthorityRepository) {
    this.repository = repository;
  }

  async login(data: { name: string; password: string }) {
    const authority = await this.repository.findOne(data.name);
    if (!authority) {
      return { success: false, message: 'Access Denied' };
    }
    if (!authority.password) {
      return { success: false, message: 'Access Denied' };
    }
    const isPassword = await authority.comparePassword(data.password);
    if (!isPassword) {
      return { success: false, message: 'Access Denied' };
    }
    const accessToken = authority.SignAccessToken();
    const refreshToken = authority.SignRefreshToken();
    return {
      success: true,
      message: 'Access granted',
      authority,
      accessToken,
      refreshToken,
    };
  }
  async addAirport(data: Airport) {
    try {
      const airport = await this.repository.addAirport(data);
      return { success: true, airport: airport };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false };
      }
      throw error;
    }
  }

  async saveAirport(airportData: any) {
    try {
      const id = airportData._id;
      const airport = await this.repository.AirportfindByIdAndUpdate(
        id,
        airportData
      );
      return { success: true, airport: airport };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }
  async deleteAirport(id: string) {
    try {
      const airport = await this.repository.suspendAirport(id);
      await this.repository.suspendSchedule('fromAirport_Id',id)
      await this.repository.suspendSchedule('toAirport_Id',id)
      return { success: true, airport: airport };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting airport: ${error.message}`);
      }
      throw error;
    }
  }

  async getAirports(data: { limit: Number; page: Number }) {
    try {
      const response = await this.repository.getAirports(data.limit, data.page);
      return {
        success: true,
        airports: response.Airports,
        pageAirports: response.pageAirports,
        totalPages: response.totalPages,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }

  async addSchedule(values: any) {
    try {
      console.log(values);
      
      const schedule = await this.repository.addSchedule(values);
      return { success: true, schedule: schedule };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false };
      }
      throw error;
    }
  }

  async getSchedules(data: { from: string; to: string }) {
    try {
      const schedules = await this.repository.getSchedules(data.from, data.to);
      return { success: true, schedules: schedules };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false };
      }
      throw error;
    }
  }

  async saveSchedule(data: Schedule) {
    try {
      const schedules = await this.repository.scheduleFindByIdandUpdate(
        data._id,
        data
      );
      return { success: true, schedule: schedules };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false };
      }
      throw error;
    }
  }

  async getAvailableSchedules() {
    try {
      const schedules = await this.repository.getAvailableSchedules();
      return schedules;
    } catch (error) {
      throw error;
    }
  }

  async scheduleCharting(data:{schedule:Schedule,flight:Flight}) {
    try{
      const {schedule,flight} = data
      const flightData = flight
      const holidays = await getHolidays(); 
      const today = new Date();
      const endDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000); 
    
      for (let date = today; date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
        
        if (schedule.daysOfWeek.includes(dayOfWeek)) {
          const isHoliday = holidays.some(holiday => holiday.getTime() === date.getTime());
          const isWeekend = [5, 6, 0].includes(date.getDay()); 
    
          const economyPrice = calculateDynamicPrice(schedule.economyPrice || 0, isHoliday, isWeekend);
          const businessPrice = calculateDynamicPrice(schedule.bussinessPrice || 0, isHoliday, isWeekend);
          const firstClassPrice = calculateDynamicPrice(schedule.firstclassPrice || 0, isHoliday, isWeekend);
    
          const departureDateTime = new Date(date);
          departureDateTime.setHours(parseInt(schedule.departureTime.split(':')[0]), parseInt(schedule.departureTime.split(':')[1]));
          const arrivalDateTime = new Date(departureDateTime.getTime() + parseDuration(schedule.duration));
    
          const flightChartData:FlightInstance = {
            scheduleId: schedule._id,
            flightId: schedule.flightId || '' ,
            status:ScheduleStatus.Scheduled,
            airlineId: schedule.airlineId || '',
            fromAirport_Id:schedule.fromAirport_Id,
            toAirport_Id:schedule.toAirport_Id,
            departureDate: departureDateTime,
            duration:schedule.duration,
            departureTime: schedule.departureTime,
            arrivalDate: arrivalDateTime,
            arrivalTime: arrivalDateTime.toTimeString().slice(0, 5), 
            availableSeats: {
              economy: flightData.economy_seats || 0,
              business: flightData.business_seats || 0,
              firstClass: flightData.first_class_seats || 0,
            },
            currentPrices: {
              economy: economyPrice,
              business: businessPrice,
              firstClass: firstClassPrice,
            },
            seatLayout: flightData.seatLayout
          };
          await this.repository.createFlightChart(flightChartData);
        }
      }
      return {success:true}
    }catch (error) {
      throw error;
    }
    
    
  }

  async searchSchedule(data:Search) {
    try {
      const schedules = await this.repository.getSearchSchedules(data);
      return schedules;
    } catch (error) {
      throw error;
    }
  }

  async getFlight(id:string) {
    try {
      const schedule = await this.repository.findById(id);
      return schedule;
    } catch (error) {
      throw error;
    }
  }

  async airlineSchedule(id:string) {
    try {
      const schedules = await this.repository.scheduleByAirlineId(id);
      return schedules;
    } catch (error) {
      throw error;
    }
  }

  async suspendSchedule(id:string) {
    try {
      const schedules = await this.repository.suspendSchedule('_id',id)
      return {success:true,schedule:schedules};
    } catch (error) {
      throw error;
    }
  }
}
