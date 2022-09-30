import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import axios from "axios";
import ProjectModel from "../models/Project.model";
import asyncHandler from "../middlewares/async";
import ErrorResponse from '../utils/ErrorResponse';


// discord auth url is: https://discord.com/api/oauth2/authorize?client_id=1025019672514543666&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20email
// our redirect url is: http://localhost:5000/api/v1/auth/discord/redirect

/**
 * after successful redirect we'll get a code in the query params. (/api/v1/auth/discord/redirect?code=ctlhzwhaCSANPKfIoQSkhdInGiJZze)
 * With the code we can ask for auth token from discord, with that auth token, we can ask for info on the user.
 * The auth token also expires, we need to refresh it after some time.
 */


//  @desc       get discord auth details
//  @route      GET /api/v1/auth/discord/redirect
//  @access     Public
export const discordRedirect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_OAUTH_TOKEN_URL, SERVER_URL } = process.env;
    const discordAuthTokenUrl = DISCORD_OAUTH_TOKEN_URL || "https://discord.com/api/v10/oauth2/token";

    const { code } = req.query;
    if (code) {
        // means this api call is done from the discord oauth2 link
        
        // next(new ErrorResponse("code not found in the query, from discord authentication", 400));

        // const projects = await ProjectModel.find({ ...req.query });

        // we'll redirect to the same api handler, but then the code will not be present (we can put the condition on that)
        // Auth token will be present then.
        const redirectUrl = `${SERVER_URL}/api/v1/auth/discord/redirect` 



        // making a post req to the discord oauth TOKEN URL, with the code. Will get the access token in return.
        const result = await axios.post(discordAuthTokenUrl, {
            'client_id': DISCORD_CLIENT_ID,
            'client_secret': DISCORD_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirectUrl
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log(result);
    }


    res.status(200)
        .json({
            success: true,
            message: `you're redirected`,
            data: { code },
        });

});
