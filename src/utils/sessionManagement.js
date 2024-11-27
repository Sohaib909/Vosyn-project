import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import "server-only";

// Read secret key used for encrypting/decrypting user session JWTs
const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  console.error(
    "ERROR: Session secret not found in environment variables. Add this secret to your .env file.",
  );
}
const encodedKey = new TextEncoder().encode(secretKey);

// Encrypt/encodes a user's session token (JWT)
export async function encrypt(payloadObject, expirationTime) {
  return new SignJWT(payloadObject)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedKey);
}

// Decrypt/decodes a user's session token (JWT)
export async function decrypt(sessionToken) {
  try {
    const { payloadObject } = await jwtVerify(sessionToken, encodedKey, {
      algorithms: ["HS256"],
    });
    return payloadObject;
  } catch (error) {
    return undefined;
  }
}

// Creates a user session by creating a JWT with user session information and storing it in the user's browser cookies
export async function createSession(sessionObject, expirationDate) {
  // TODO: Update expiresAt to get expiration time from server response (i.e. expirationDate)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // TODO: After changing expiration time to get response from server, update expirationDate passed to encrypt
  const session = await encrypt(
    { ...sessionObject, expiresAt },
    expirationDate,
  )(await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// Deletes a user session by removing the session token from the user's browser cookies
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
