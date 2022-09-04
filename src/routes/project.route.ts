import { Router } from "express";
// import { prefetchProject, createProject, getProjects, updateProject, deleteProject} from '../controllers/project.controller';
import { getProjects} from '../controllers/project.controller';


const router = Router();



router.route("/").get(getProjects);
// todo routes:

// router.route("/preFetch").get(prefetchProject);
// router.route("/create").post(createProject);
// router.route("/update/:id").put(updateProject);
// router.route("/delete/:id").delete(deleteProject);

export default router;
