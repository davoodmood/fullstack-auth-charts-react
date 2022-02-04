
import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../model/session.model";
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import { get } from "lodash";
const isDemo = config.get("demo");

let demoSession : {
  _id: string;
  user?: string;
  userAgent?: string;
  valid?: boolean;
} = {
  _id: 'demo',
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return isDemo? demoSession : Session.find(query).lean();
}

export async function createSession(userId: string, userAgent: string) {
  let session;
  if(!isDemo) {
    session = await Session.create({ user: userId, userAgent });
  } else {
    demoSession = {...demoSession, user: userId, userAgent, valid: true}
    return demoSession
  }  
  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    any;
  session:
    any;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}

export async function reIssueAccessToken({
    refreshToken,
  }: {
    refreshToken: string;
  }) {
    // Decode the refresh token
    const { decoded } = decode(refreshToken);
  
    if (!decoded || !get(decoded, "_id")) return false;
  
    // Get the session
    const session = await Session.findById(get(decoded, "_id"));
  
    // Make sure the session is still valid
    if (!session || !session?.valid) return false;
  
    const user = await findUser({ _id: session.user });
  
    if (!user) return false;
  
    const accessToken = createAccessToken({ user, session });
  
    return accessToken;
  }
  
  export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
  ) {
    if (isDemo) demoSession = {...demoSession, ...update}
    return isDemo? demoSession : Session.updateOne(query, update);
  }