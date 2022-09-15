"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please add a course title"],
    },
    githubLinks: {
        type: [String],
    },
    outline: {
        type: String,
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    pictureUrls: {
        type: [String], // will be saved in s3
    },
    fileUrls: {
        type: [String], // will be saved in s3
    },
    tags: {
        type: [String],
    },
    developers: {
        type: [String],
    },
    otherLinks: {
        type: [String],
    },
    achievements: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const ProjectModel = mongoose_1.default.model("Project", ProjectSchema);
exports.default = ProjectModel;
