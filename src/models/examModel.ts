

import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
    {



        name: {
            type: String,
            required: true,
            unique: true,
        },
        topic: {
            type: String,
            required: true,
        },
        topicIdStr: {
            type: String,
            required: true,
        }

    }
);

// delete old model
if (mongoose.models.exams) {
    const examModel = mongoose.model("exams");
    mongoose.deleteModel(examModel.modelName);
}

// create new model
const Exam = mongoose.model("exams", examSchema);
export default Exam;
