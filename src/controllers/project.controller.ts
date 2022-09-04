import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import ProjectModel from "../models/Project.model";
import asyncHandler from "../middlewares/async";




//  @desc       get projects
//  @route      POST /api/v1/projects/
//  @access     Public
export const getProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
   
    const projects = await ProjectModel.find({ ...req.query });

    res.status(200)
        .json({
            success: true,
            message: `Projects fetched successfully`,
            data: projects,
        });

});




