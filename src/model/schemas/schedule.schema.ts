import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface for Schedule
export interface ISchedule extends Document {
  fromAirport_Id: String;
  toAirport_Id: String;
  arrivalTime: String;
  duration: String;
  departureTime: String;
  daysOfWeek: String[];
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
        validator: function(value: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // HH:mm format
        },
        message: (props) => `${props.value} is not a valid time!`
      },
    },
    duration: {
      type: String,
      required: true,
      validate: {
        validator: function(value: string) {
          return /^(\d{1,2}):([0-5]\d)$/.test(value); // HH:mm format
        },
        message: (props) => `${props.value} is not a valid duration!`
      },
    },
    departureTime: {
      type: String,
      required: true,
      validate: {
        validator: function(value: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // HH:mm format
        },
        message: (props) => `${props.value} is not a valid time!`
      },
    },
    daysOfWeek: {
      type: [String],
      required: true,
      validate: {
        validator: function(value: string[]) {
          return value.every(day => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(day));
        },
        message: (props) => `${props.value} is not a valid day of the week!`
      },
    },
  },
  {
    timestamps: true,
  }
);

// Model for Schedule
const ScheduleModel: Model<ISchedule> = mongoose.model('Schedules', scheduleSchema);

export default ScheduleModel;
