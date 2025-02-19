// src/controllers/driverController.ts
import { Request, Response } from "express";
import Driver from "../models/driver";

const getFlagUrl = (countryCode: string): string =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;

export const getDrivers = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search;
    let query = {};
    if (searchQuery) {
      query = {
        $or: [
          { givenName: { $regex: new RegExp(searchQuery.toString(), "i") } },
          { familyName: { $regex: new RegExp(searchQuery.toString(), "i") } },
        ],
      };
    }
    console.log("Driver Query:", query);
    const drivers = await Driver.find(query);
    console.log("Found Drivers:", drivers);

    const enhancedDrivers = drivers.map((driver) => ({
      ...driver.toObject(),
      flagUrl: getFlagUrl(driver.countryCode),
    }));

    res.status(200).json(enhancedDrivers);
  } catch (error) {
    console.error("Error in getDrivers:", error);
    res
      .status(500)
      .json({
        error: "Er is een fout opgetreden bij het ophalen van drivers.",
      });
  }
};
