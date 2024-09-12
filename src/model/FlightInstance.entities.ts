export interface FlightInstance {
  _id?: string;
  scheduleId: string;
  flightId: string;
  baggagePolicyId:string;
  refundPolicyId:string;
  airlineId: string;
  departureDate: Date;
  arrivalDate: Date;
  fromAirport_Id:string;
  toAirport_Id:string;
  departureTime: string;
  arrivalTime: string;
  duration:String;
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'cancelled';
  availableSeats: {
    economy: number;
    business: number;
    firstClass: number;
  };
  currentPrices: {
    economy: number;
    business: number;
    firstClass: number;
  };
  seatLayout: {
    economyClass: Row[];
    businessClass: Row[];
    firstClass: Row[];
  };
}

interface Seat {
  number: string;
  position: 'window' | 'middle' | 'aisle';
  isAvailable: boolean;
  userId?: string; // Optional, to be filled when a seat is booked
}

interface Row {
  row: number;
  seats: Seat[];
}