import { Request, Response } from "express";
import { BikeServices } from "./bike.service";
const createBike = async (req: Request, res: Response) => {
  try {
    const bike = req.body;
    const result = await BikeServices.createBikeIntoDB(bike);
    res.status(200).json({
      message: "Bike created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).send({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};
const getBike = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  try {
    const result = await BikeServices.getBikeFromDB(searchTerm as string);
    res.send({
      message: "Bikes retrieved successfully",
      success: true,
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
      error,
    });
  }
};
const getSingleBike = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const result = await BikeServices.getSingleBike(productId);
  try {
    res.send({
      message: "Bike retrieved successfully",
      success: true,
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
      error,
    });
  }
};

const deleteBike = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BikeServices.deleteBike(id);
  try {
    res.send({
      message: "Bike deleted successfully",
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
      error,
    });
  }
};
const updateBike = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const updatedData = req.body;
  const result = await BikeServices.updateBike(productId, updatedData);
  try {
    res.send({
      success: true,
      message: "Bike updated successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

export const bikeController = {
  createBike,
  getBike,
  getSingleBike,
  deleteBike,
  updateBike,
};
