import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import ProjectModel from "../models/Project.model";
import asyncHandler from "../middlewares/async";
import ErrorResponse from '../utils/ErrorResponse';


// discord auth url is: https://discord.com/api/oauth2/authorize?client_id=1025019672514543666&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20email
// our redirect url is: http://localhost:5000/api/v1/auth/discord/redirect

/**
 * after successful redirect we'll get a code in the query params. (/api/v1/auth/discord/redirect?code=ctlhzwhaCSANPKfIoQSkhdInGiJZze)
 * With the code we can ask for auth token from discord, with that auth token, we can ask for info on the user.
 * The auth token also expires, we need to refresh it time and again.
 */


//  @desc       get discord auth details
//  @route      GET /api/v1/auth/discord/redirect
//  @access     Public
export const discordRedirect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    // const projects = await ProjectModel.find({ ...req.query });

    res.status(200)
        .json({
            success: true,
            message: `you're redirected`,
            data: {},
        });

});
