// src/models/driver.ts
import { Schema, model, Document } from "mongoose";

export interface IDriver extends Document {
  driver_id: string;
  permanentNumber?: string;
  code?: string;
  countryCode: string;
  url?: string;
  givenName: string;
  familyName: string;
  dateOfBirth?: Date;
  nationality?: string;
  image?: string;
}

const driverSchema = new Schema<IDriver>({
  driver_id: { type: String, required: true },
  permanentNumber: { type: String },
  code: { type: String },
  countryCode: { type: String, required: true },
  url: { type: String },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  dateOfBirth: { type: Date },
  nationality: { type: String },
  image: { type: String },
});

export default model<IDriver>("Driver", driverSchema);
