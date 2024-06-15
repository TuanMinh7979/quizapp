import mongoose from "mongoose";
const examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        
        topicSlug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }, 
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
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
