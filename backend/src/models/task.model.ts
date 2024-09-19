import {
  Document,
  Schema,
  model,
  models,
  Types,
} from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
  user: Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const Task = models?.Task || model<ITask>("Task", taskSchema);
