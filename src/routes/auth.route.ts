import { Router } from "express";
// import { prefetchProject, createProject, getProjects, updateProject, deleteProject} from '../controllers/project.controller';
import { discordRedirect } from '../controllers/auth.controller';


const router = Router();



router.route("/discord/redirect").get(discordRedirect);

export default router;
