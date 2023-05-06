import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { versionKey: false });

const Course = mongoose.model('Courses', courseSchema);

export { Course };