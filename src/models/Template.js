import mongoose from "mongoose";

const VariableSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: mongoose.Schema.Types.Mixed,
});

const TemplateSchema = new mongoose.Schema({
    templateName: String,
    jsxCode: String,
    templateType: String,
    variables: [VariableSchema],
});

export default mongoose.models.Template ||
    mongoose.model("Template", TemplateSchema);
