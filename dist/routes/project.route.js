"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { prefetchProject, createProject, getProjects, updateProject, deleteProject} from '../controllers/project.controller';
const project_controller_1 = require("../controllers/project.controller");
const router = (0, express_1.Router)();
router.route("/all").get(project_controller_1.getProjects);
router.route("/all/:id").get(project_controller_1.getProject);
router.route("/create").post(project_controller_1.createProject);
// todo routes:
// router.route("/preFetch").get(prefetchProject);
// router.route("/update/:id").put(updateProject);
// router.route("/delete/:id").delete(deleteProject);
exports.default = router;
