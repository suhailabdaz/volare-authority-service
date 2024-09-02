import { IAuthorityRepository } from "../interfaces/IAuthorityRepository";
import AuthorirtyModel, { IAuthority } from "../model/schemas/authority.schema";
import { Authority } from "../model/authority.entities";
import AirportModel,{IAirport} from "../model/schemas/airport.schema";
import { Airport } from "../model/airport.entities";
import ScheduleModel, { ISchedule } from "../model/schemas/schedule.schema";
import { Schedule } from "../model/schedule.entity";
import { Search } from "../model/search.entity";
import FlightChartModel, { IFlightChart } from "../model/schemas/chartflight.schema";
import { FlightInstance } from "../model/FlightInstance.entities";
import { ScheduleStatus } from "../interfaces/enum.status";

interface DecodedSeat {
  seatNumber: string;
  travellerId: string;
  class: 'economyClass' | 'businessClass' | 'firstClass';
}

export class AuthorityRepository implements IAuthorityRepository {
  async findOne(name: string): Promise<IAuthority | null> {
    try {
      const user = await AuthorirtyModel.findOne({ name });
      return user;
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async findById(id:string): Promise<IFlightChart | null> {
    try {
      const user = await FlightChartModel.findById(id);
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
  async scheduleFindByIdandUpdate (id: string, values:any): Promise<ISchedule | null> {
    try {
      const schedules = await ScheduleModel.findByIdAndUpdate(id, values,{ new: true, runValidators: true } );
      return schedules;
    } catch (e: any) {
      throw new Error("db error");
    }
  }
  

  async suspendAirport(id: string) {
    try {
      const airport = await AirportModel.findById(id);
      if (!airport) {
        throw new Error('Airport not found');
      }
      if (airport.status==null){
        airport.status = false
      }else{
        airport.status = !airport.status;
      }
      await airport.save();
      return airport;
    } catch (e: any) {
      throw new Error("DB error: " + e.message);
    }
  }

  async  getAirports(limit:number,page:number){
    try {
      const Airports = await AirportModel.find()
      const skip = (page - 1) * limit;
      const pageAirports = await AirportModel.find()
      .skip(skip)
      .limit(limit)
      .exec();
    const totalAirports = await AirportModel.countDocuments().exec();
    const totalPages = Math.ceil(totalAirports / limit);

    return {
      pageAirports,
      Airports,
      totalPages,
    };
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
        available:true,
        status:true,
      });
      return schedules;
    } catch (e: any) {
      throw new Error("db error");
    }
  }


  
  async scheduleByAirlineId(id:string):Promise<ISchedule[]|ISchedule | null>{
    try {
      const schedules = await ScheduleModel.find({
        airlineId:id
      });
      return schedules;
    } catch (e: any) {
      throw new Error("db error");
    }
  }
  async getSearchSchedules(data:Search):Promise<IFlightChart[]|IFlightChart | null>{
    try {
      const searchDate = new Date(data.date);
const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));

const schedules = await FlightChartModel.find({
  fromAirport_Id: data.from,
  toAirport_Id: data.to,
  departureDate: {
    $gte: startOfDay,
    $lte: endOfDay
  },
  status:ScheduleStatus.Scheduled,
  
});
      return schedules;
    } catch (e: any) {
      throw new Error("db error");
    }
  }
  async suspendSchedule(field: string, id: string) {
    try {
      if(field=='toAirport_Id'||'fromAirport_Id'){
      const result = await ScheduleModel.updateMany(
        { [field]: id, status: true },
        { $set: { status: false } }
      );
    }else{
     const schedule = await ScheduleModel.findById(id)
       if(schedule){
       schedule.status = !schedule.status
       await schedule.save()
       }
    }
      const schedule = await ScheduleModel.findById(id)
      return schedule;
      
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async  createFlightChart(flightChartData: FlightInstance):Promise<IFlightChart | null> {
    const flightChart = new FlightChartModel(flightChartData);
    await flightChart.save();
    return flightChart;
  }

  

  async updateSeatConfirmation(data: { flightChartId: string; seats: DecodedSeat[] }): Promise<IFlightChart | null> {
    

    const flightChart = await FlightChartModel.findById(data.flightChartId);

    if (!flightChart) {
      throw new Error('Flight chart not found');
    }

    for (const decodedSeat of data.seats) {
      const { seatNumber, travellerId, class: seatClass } = decodedSeat;

      // Find the correct row and seat
      const classLayout = flightChart.seatLayout[seatClass];
      for (const row of classLayout) {
        const seat = row.seats.find(s => s.number === seatNumber);
        if (seat) {
          seat.isAvailable = false;
          seat.userId = travellerId;
          break;
        }
      }

      const seatClassMap: { [key in 'economyClass' | 'businessClass' | 'firstClass']: keyof typeof flightChart.availableSeats } = {
        economyClass: 'economy',
        businessClass: 'business',
        firstClass: 'firstClass',
      };
      
      flightChart.availableSeats[seatClassMap[seatClass]] -= 1;
          }

    // Save the updated flight chart
    await flightChart.save();

    return flightChart;
      }


}
