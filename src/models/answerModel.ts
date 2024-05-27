

import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        lbl: {
            type: String,
            required: true,
        },
        examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
);

// delete old model
if (mongoose.models.answers) {
    const answerModel = mongoose.model("answers");
    mongoose.deleteModel(answerModel.modelName);
}

// create new model
const Answer = mongoose.model("answers", answerSchema);
export default Answer;
