import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);
// delete old model
if (mongoose.models.users) {
    const userModel = mongoose.model("users");
    mongoose.deleteModel(userModel.modelName);
}
// create new model
const User = mongoose.model("users", userSchema);
export default User;
