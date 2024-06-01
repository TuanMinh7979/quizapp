import mongoose from "mongoose";
const examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        topicName: {
            type: String,
            required: true,
        },
        topicSlug: {
            type: String,
            required: true,
        },
        description: {
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
