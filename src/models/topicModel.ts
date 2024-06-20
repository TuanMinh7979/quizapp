import mongoose from "mongoose";
const topicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
        }, 

        vip:{
            type:Number

            
        }, 
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    }
);
// delete old model
if (mongoose.models.topics) {
    const topicModel = mongoose.model("topics");
    mongoose.deleteModel(topicModel.modelName);
}
// create new model
const Topic = mongoose.model("topics", topicSchema);
export default Topic;
