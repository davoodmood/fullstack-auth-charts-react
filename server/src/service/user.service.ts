import { DocumentDefinition, FilterQuery } from "mongoose";
import bcrypt from "bcrypt";
import User, { UserDocument } from "../model/user.model";
import { omit } from "lodash";
import config from 'config'
const isDemo : boolean = config.get("demo")
let demoUser: {
  _id: string;
  email: string;
  name: string;
  password: string;
};


export async function createUser(input: DocumentDefinition<
  Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
>) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    demoUser = await config.get("demoUser")
    return isDemo? demoUser : User.findOne(query).lean();
}

export async function validatePassword({
    email,
    password,
  }: {
    email: UserDocument["email"];
    password: string;
  }) {

    if (isDemo) {
        demoUser = await config.get("demoUser")
        const user = demoUser
        const isValid = await password === user.password ? true : false;
        if (!isValid) {
          return false;
        }
        return omit(user, "password");
    } else {
        const user = await User.findOne({ email });
        if (!user) {
          return false;
        }
        const isValid = await user.comparePassword(password);
        if (!isValid) {
          return false;
        }
        return omit(user.toJSON(), "password");
    }
}