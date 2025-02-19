// src/models/team.ts
import { Schema, model, Document } from "mongoose";

export interface TeamDriver {
  driver_id?: string; // if available; sometimes may include additional info
  position?: number;
  image?: string;
}

export interface ITeam extends Document {
  team_id: string;
  name: string;
  principal: string;
  base: string;
  founded_year: number;
  engine: string;
  drivers: TeamDriver[];
}

const teamDriverSchema = new Schema<TeamDriver>(
  {
    driver_id: { type: String },
    position: { type: Number },
    image: { type: String },
  },
  { _id: false }
);

const teamSchema = new Schema<ITeam>({
  team_id: { type: String, required: true },
  name: { type: String, required: true },
  principal: { type: String, required: true },
  base: { type: String, required: true },
  founded_year: { type: Number, required: true },
  engine: { type: String, required: true },
  drivers: { type: [teamDriverSchema], required: true },
});

export default model<ITeam>("Team", teamSchema);
