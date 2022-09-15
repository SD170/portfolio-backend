"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.getProject = exports.getProjects = void 0;
const Project_model_1 = __importDefault(require("../models/Project.model"));
const async_1 = __importDefault(require("../middlewares/async"));
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
//  @desc       get projects
//  @route      GET /api/v1/projects
//  @access     Public
exports.getProjects = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield Project_model_1.default.find(Object.assign({}, req.query));
    res.status(200)
        .json({
        success: true,
        message: `Projects fetched successfully`,
        data: projects,
    });
}));
//  @desc       get single project
//  @route      GET /api/v1/projects/:id
//  @access     Public
exports.getProject = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        next(new ErrorResponse_1.default("Please provide projectId in path params", 400));
    }
    const project = yield Project_model_1.default.findById(req.params.id);
    res.status(200)
        .json({
        success: true,
        message: `Project fetched successfully`,
        data: project,
    });
}));
//  @desc       create single project
//  @route      POST /api/v1/projects/create
//  @access     Private
exports.createProject = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = new Project_model_1.default(Object.assign({}, req.body));
    const savedProject = yield newProject.save();
    res.status(200)
        .json({
        success: true,
        message: `Project created successfully`,
        data: savedProject,
    });
}));
