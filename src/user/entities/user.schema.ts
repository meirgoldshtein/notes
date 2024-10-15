import { Schema } from "mongoose";
import { IUser } from "./user.interface";

export const userSchema = new Schema<IUser>({

    username: {
        type: 'string',
        unique: true,
        required: true,

    },
    email: {
        type: 'string',
        unique: true,
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },

},{
    timestamps: true,
    versionKey: false
}
)

