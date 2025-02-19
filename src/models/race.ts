// src/models/race.ts
import { Schema, model, Document } from "mongoose";

export interface RaceResult {
  position: number;
  driver_id: string; // using string as per your sample (e.g., "max_verstappen")
  time: number; // in milliseconds
  points: number;
}

export interface IRace extends Document {
  round: number;
  circuit_id: string; // using string (e.g., "bahrain")
  date: Date;
  sprint_race: boolean;
  fastest_lap?: string;
  race_results: RaceResult[];
}

const raceResultSchema = new Schema<RaceResult>(
  {
    position: { type: Number, required: true },
    driver_id: { type: String, required: true },
    time: { type: Number, required: true },
    points: { type: Number, required: true },
  },
  { _id: false }
);

const raceSchema = new Schema<IRace>({
  round: { type: Number, required: true },
  circuit_id: { type: String, required: true },
  date: { type: Date, required: true },
  sprint_race: { type: Boolean, required: true },
  fastest_lap: { type: String },
  race_results: { type: [raceResultSchema], required: true },
});

export default model<IRace>("Race", raceSchema);
