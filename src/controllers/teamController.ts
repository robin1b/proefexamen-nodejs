// src/controllers/teamController.ts
import { Request, Response } from "express";
import Team from "../models/team";
import Driver from "../models/driver";

/**
 * Helper: Generate a flag URL based on a country code.
 */
const getFlagUrl = (countryCode: string): string =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;

/**
 * Controller: GET /teams
 * Retrieves all teams, enriches each team with:
 * - A flag URL (based on the team's countryCode)
 * - Expanded driver details for each driver listed in the team.
 */
export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find();

    const enhancedTeams = await Promise.all(
      teams.map(async (team) => {
        // Assuming your team document has a `countryCode` field.
        const flagUrl = getFlagUrl((team as any).countryCode || "");
        // For teams that contain an array of drivers (with a driver_id), expand each driver with details.
        const expandedDrivers = await Promise.all(
          team.drivers.map(async (teamDriver) => {
            if (teamDriver.driver_id) {
              return await Driver.findOne({ driver_id: teamDriver.driver_id });
            }
            return teamDriver;
          })
        );

        return {
          ...team.toObject(),
          flagUrl,
          drivers: expandedDrivers,
        };
      })
    );

    res.status(200).json(enhancedTeams);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Er is een fout opgetreden bij het ophalen van teams." });
  }
};
