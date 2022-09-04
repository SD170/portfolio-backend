const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please add a course title"],
    },
    githubLink: {
        type: String,
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


const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;