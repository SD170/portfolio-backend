import { Router } from "express";
// import { prefetchProject, createProject, getProjects, updateProject, deleteProject} from '../controllers/project.controller';
import { discordRedirect, discordSecondRedirect } from '../controllers/auth.controller';


const router = Router();



router.route("/discord/redirect").get(discordRedirect);
router.route("/discord/second-redirect").get(discordSecondRedirect);

export default router;
