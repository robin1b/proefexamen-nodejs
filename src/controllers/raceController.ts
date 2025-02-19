// src/controllers/raceController.ts
import { Request, Response } from "express";
import Race from "../models/race";
import Driver from "../models/driver";

/**
 * Helper: Generate a flag URL based on a country code.
 */
const getFlagUrl = (countryCode: string): string =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;

/**
 * Helper: Format time based on the finishing position and whether formatting is requested.
 * - For position 1: Format as H:MM:SS.mmm (e.g. 1:31:44.742)
 * - For positions 2 and 3: Convert to seconds with 3 decimals (e.g. 22.457)
 */
const formatTimeForPosition = (
  timeMs: number,
  position: number,
  format: boolean
): string => {
  if (!format) return timeMs.toString();

  if (position === 1) {
    const hours = Math.floor(timeMs / 3600000);
    const minutes = Math.floor((timeMs % 3600000) / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    const milliseconds = timeMs % 1000;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  } else if (position === 2 || position === 3) {
    return (timeMs / 1000).toFixed(3);
  }
  return timeMs.toString();
};

/**
 * Controller: GET /races
 * Retrieves all races, enriches each race with:
 * - A flag URL (based on the race's countryCode)
 * - Enhanced race results containing driver details and formatted times
 */
export const getRaces = async (req: Request, res: Response) => {
  try {
    // Determine if time formatting is requested via query parameter
    const format = req.query.format === "true";
    const races = await Race.find();

    const enhancedRaces = await Promise.all(
      races.map(async (race) => {
        // Assuming your race document has a `countryCode` field; if not, adjust accordingly.
        const flagUrl = getFlagUrl((race as any).countryCode || "");
        // Enhance each race result with driver details and formatted time.
        const enhancedResults = await Promise.all(
          race.race_results.map(async (result) => {
            // Look up the driver using driver_id (assuming your Driver model uses driver_id as a string field)
            const driver = await Driver.findOne({
              driver_id: result.driver_id,
            });
            return {
              ...result,
              driver,
              time: formatTimeForPosition(result.time, result.position, format),
            };
          })
        );

        return {
          ...race.toObject(),
          flagUrl,
          race_results: enhancedResults,
        };
      })
    );

    res.status(200).json(enhancedRaces);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Er is een fout opgetreden bij het ophalen van races." });
  }
};
