import mongoose, { Document, Model, Schema } from 'mongoose';

interface Coordinates {
  lat: number;
  long: number;
}

export interface IAirport extends Document {
  airport_name: string;
  airport_code: string;
  city: string;
  country: string;
  coordinates: Coordinates; 
  status:boolean
}

const CoordinatesSchema: Schema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
});


const airportSchema: Schema<IAirport> = new mongoose.Schema(
  {
    airport_name: {
      type: String,
      required: true,
    },
    airport_code: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    coordinates:{
      type:CoordinatesSchema,
      required:true
    },
    status: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

const AirportModel: Model<IAirport> = mongoose.model('Airports', airportSchema);
export default AirportModel;
