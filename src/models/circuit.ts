// src/models/circuit.ts
import { Schema, model, Document } from "mongoose";

export interface ICircuit extends Document {
  circuit_id: string;
  name: string;
  image?: string;
  location: {
    length_km: number;
    turns: number;
  };
}

const circuitSchema = new Schema<ICircuit>({
  circuit_id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  location: {
    length_km: { type: Number, required: true },
    turns: { type: Number, required: true },
  },
});

export default model<ICircuit>("Circuit", circuitSchema);
