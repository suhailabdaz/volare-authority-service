import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISchedule extends Document {
  fromAirport_Id: any;
  toAirport_Id: any;
  arrivalTime: string;
  duration: string;
  departureTime: string;
  status:boolean;
  available:boolean;
  daysOfWeek: string[];
  flightId?: string; 
  airlineId?:string;
  refundPolicyId?:string;
  baggagePolicyId?:string;
  economyPrice?:Number;
  bussinessPrice?:Number;
  firstclassPrice?:Number;
}

// Schema for Schedule
const scheduleSchema: Schema<ISchedule> = new mongoose.Schema(
  {
    fromAirport_Id: {
      type: Schema.Types.ObjectId,
      ref: 'Airports',
      required: true,
    },
    toAirport_Id: {
      type: Schema.Types.ObjectId,
      ref: 'Airports',
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // HH:mm format
        },
        message: (props) => `${props.value} is not a valid time!`,
      },
    },
    duration: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^(\d{1,2}):([0-5]\d)$/.test(value); // HH:mm format
        },
        message: (props) => `${props.value} is not a valid duration!`,
      },
    },
    departureTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // HH:mm format
        },
        message: (props) => `${props.value} is not a valid time!`,
      },
    },
    status:{
      type:Boolean,
      default:true,
    },
    available:{
      type:Boolean,
      default:true,
    },
    flightId: {
      type: String, 
      required: false,
    },
    airlineId: {
      type: String, 
      required: false,
    },
    refundPolicyId: {
      type: String, 
      required: false,
    },
    baggagePolicyId: {
      type: String, 
      required: false,
    },
    economyPrice: {
      type: Number, 
      required: false,
    },
    bussinessPrice: {
      type: Number, 
      required: false,
    },
    firstclassPrice: {
      type: Number, 
      required: false,
    },
    daysOfWeek: {
      type: [String],
      required: true,
      validate: {
        validator: function (value: string[]) {
          return value.every((day) =>
            [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ].includes(day)
          );
        },
        message: (props) => `${props.value} is not a valid day of the week!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ScheduleModel: Model<ISchedule> = mongoose.model(
  'Schedules', 
  scheduleSchema
);

export default ScheduleModel;
