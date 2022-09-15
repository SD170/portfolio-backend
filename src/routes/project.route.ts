import { Router } from "express";
// import { prefetchProject, createProject, getProjects, updateProject, deleteProject} from '../controllers/project.controller';
import { getProjects, getProject, createProject} from '../controllers/project.controller';


const router = Router();



router.route("/all").get(getProjects);
router.route("/all/:id").get(getProject);
router.route("/create").post(createProject);

// todo routes:
// router.route("/preFetch").get(prefetchProject);
// router.route("/update/:id").put(updateProject);
// router.route("/delete/:id").delete(deleteProject);

export default router;
