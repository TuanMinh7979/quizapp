import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
    {
        rightLbl: {
            type: String,
            required: true,
        },
        imgLink: {
            type: String,
        },
        videoLink: {
            type: String,
            default:""
        },
        note: {
            type: String,
              default:"Xem video"
            
        },
        title: {
            type: String,
            default:"Đề thi 2023"
        },
        examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    }
);
// delete old model
if (mongoose.models.questions) {
    const questionModel = mongoose.model("questions");
    mongoose.deleteModel(questionModel.modelName);
}
// create new model
const Question = mongoose.model("questions", questionSchema);
export default Question;
