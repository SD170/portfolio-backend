import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import axios from "axios";
import url from "url";
import ProjectModel from "../models/Project.model";
import asyncHandler from "../middlewares/async";
import ErrorResponse from '../utils/ErrorResponse';


// discord auth url is: https://discord.com/api/oauth2/authorize?client_id=1025019672514543666&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20email%20guilds
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
    const discordAuthTokenUrl = `${DISCORD_OAUTH_TOKEN_URL}/oauth2/token` || "https://discord.com/api/v10/oauth2/token";
    // redirectUrl in the post req to the DISCORD_TOKEN_URI needs to be already mentioned in the discord dev portal.
    // gives error if not the **SAME** as the current(controllers) url. cuz
    // redirect_uri: the redirect_uri associated with this authorization, usually from your authorization URL
    const redirectUri = `${SERVER_URL}/api/v1/auth/discord/redirect`

    const { code } = req.query;
    if (!code) {
        return next(new ErrorResponse("code not found in the query, from discord authentication", 400));
    }

    if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
        return next(new ErrorResponse("Can't access Discord ClientID and Secret", 400));

    }

    // creating a formdata as discord TOKEN_URL only accepts form data
    // we can do that using url.URLSearchParams
    const formData = new url.URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: redirectUri
    });

    type tokenData = {
        access_token: string,
        expires_in: number,
        refresh_token: string,
        scope: string,
        token_type: string
    }

    // making a post req to the discord oauth TOKEN URL, with the code. Will get the access token in return.
    const { data: authTokenData }: { data: tokenData } = await axios.post(discordAuthTokenUrl,
        formData.toString(),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    // P.S:
    /**
     * Destructuring with rename:
     *      const { data: authTokenData } = await axios.post()
     * Destructuring with rename with types:
     *      const { data: authTokenData }: { data: tokenData } = await axios.post()
     * 
     * now authTokenData is of type tokenData
     */


    // const authTokenData: tokenData = authTokenResponse.data;

    // calling for email with the authToken
    // URL for email is: GET /users/@me
    const emailResponse = await axios.get(`${DISCORD_OAUTH_TOKEN_URL}/users/@me`,
        {
            headers: {
                'Authorization': `Bearer ${authTokenData.access_token}`
            }
        });

    // calling for guilds with the authToken
    // URL for email is: GET /users/@me/guilds
    const guildResponse = await axios.get(`${DISCORD_OAUTH_TOKEN_URL}/users/@me/guilds`,
        {
            headers: {
                'Authorization': `Bearer ${authTokenData.access_token}`
            }
        });

    const resData = {
        emailData: emailResponse.data,
        guildData: guildResponse.data
    }


    return res.status(200)
        .json({
            success: true,
            message: `you're redirected`,
            data: resData,
        });



});


//  @desc       get discord auth details
//  @route      GET /api/v1/auth/discord/second-redirect
//  @access     Public
export const discordSecondRedirect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("second redirect called");
    res.status(200)
        .json({
            success: true,
            message: `this is the second redirect`,
            data: { q: req.query, b: req.body, p: req.params },
        });

});