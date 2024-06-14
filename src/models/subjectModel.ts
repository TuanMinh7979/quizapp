import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
        }
    }
);
// delete old model
if (mongoose.models.subjects) {
    const subjectModel = mongoose.model("subjects");
    mongoose.deleteModel(subjectModel.modelName);
}
// create new model
const Subject = mongoose.model("subjects", subjectSchema);
export default Subject;
