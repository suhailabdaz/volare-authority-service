import mongoose, { Document, Model, Schema } from 'mongoose';

interface Seat {
  number: string;
  position: 'window' | 'middle' | 'aisle';
  isAvailable: boolean;
  userId?: string; 
}

interface Row {
  row: number;
  seats: Seat[];
}

export interface IFlightChart extends Document {
  scheduleId: mongoose.Schema.Types.ObjectId;
  flightId: string;
  airlineId: string;
  departureDate: Date;
  arrivalDate:Date;
  arrivalTime: string;
  departureTime: string;
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

const seatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  position: { type: String, enum: ['window', 'middle', 'aisle'], required: true },
  isAvailable: { type: Boolean, default: true },
  userId: { type: String } 
});

const rowSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  seats: [seatSchema]
});

const seatLayoutSchema = new mongoose.Schema({
  economyClass: [rowSchema],
  businessClass: [rowSchema],
  firstClass: [rowSchema]
});

// Schema for FlightChart
const flightChartSchema: Schema<IFlightChart> = new mongoose.Schema(
  {
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Schedules',
      required: true,
    },
    flightId: {
      type: String,
      required: true,
    },
    airlineId: {
      type: String,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'boarding', 'departed', 'arrived', 'cancelled'],
      default: 'scheduled',
    },
    availableSeats: {
      economy: Number,
      business: Number,
      firstClass: Number,
    },
    currentPrices: {
      economy: Number,
      business: Number,
      firstClass: Number,
    },
    seatLayout: {
      type: seatLayoutSchema,
      required: true, // Seat layout is now required
    },
  },
  {
    timestamps: true,
  }
);

const FlightChartModel: Model<IFlightChart> = mongoose.model('FlightCharts', flightChartSchema);

export default FlightChartModel;
