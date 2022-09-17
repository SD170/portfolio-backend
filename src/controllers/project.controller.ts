import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import ProjectModel from "../models/Project.model";
import asyncHandler from "../middlewares/async";
import ErrorResponse from '../utils/ErrorResponse';




//  @desc       get projects
//  @route      GET /api/v1/projects/all
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

//  @desc       get single project
//  @route      GET /api/v1/projects/all/:id
//  @access     Public
export const getProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    if (!req.params.id) {
        next(new ErrorResponse("Please provide projectId in path params", 400))
    }
   
    const project = await ProjectModel.findById(req.params.id);

    res.status(200)
        .json({
            success: true,
            message: `Project fetched successfully`,
            data: project,
        });

});

//  @desc       create single project
//  @route      POST /api/v1/projects/create
//  @access     Private
export const createProject = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const newProject = new ProjectModel({
        ...req.body
    });

    const savedProject = await newProject.save();

    res.status(200)
        .json({
            success: true,
            message: `Project created successfully`,
            data: savedProject,
        });

});


