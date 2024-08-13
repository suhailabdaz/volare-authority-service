export interface FlightInstance {
  _id?: string;
  scheduleId: string;
  flightId: string;
  airlineId: string;
  departureDate: Date;
  arrivalDate: Date;
  departureTime: string;
  arrivalTime: string;
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