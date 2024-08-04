import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAirport extends Document {
  airport_name: string;
  airport_code: string;
  city: string;
  country: string;
}

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
  },
  {
    timestamps: true,
  }
);

const AirportModel: Model<IAirport> = mongoose.model('Airports', airportSchema);
export default AirportModel;
