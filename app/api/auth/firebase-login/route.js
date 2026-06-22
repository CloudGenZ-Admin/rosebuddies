import { NextResponse } from "next/server";
import { admin } from "../../../../lib/firebaseAdmin.js";
import { User } from "../../../../lib/models/user.js";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    const { firebaseToken, firstName: bodyFirstName, lastName: bodyLastName } = body;

    if (!firebaseToken) {
      return NextResponse.json({ error: "Firebase token is required" }, { status: 400 });
    }

    // 1. Verify the Firebase ID Token using the Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const { uid, email, name, picture } = decodedToken;

    if (!email) {
      return NextResponse.json({ error: "Email is required from Firebase account" }, { status: 400 });
    }

    // 2. Check if user exists in our local MySQL database
    let user = await User.findOne({ where: { firebaseUid: uid } });

    // 3. Fallback: Check if they exist by email but haven't linked their Firebase account yet
    if (!user) {
      user = await User.findOne({ where: { email } });
      if (user) {
        // Link the existing local account to this Firebase UID
        user.firebaseUid = uid;
        await user.save();
      }
    }

    // 4. If completely new, create the user in MySQL
    if (!user) {
      let finalFirstName = null;
      let finalLastName = null;
      
      // 1. First priority: Use the 'name' (displayName) from the Google Token
      if (name) {
        const nameParts = name.split(" ");
        finalFirstName = nameParts[0];
        finalLastName = nameParts.slice(1).join(" ") || null;
      } 
      // 2. Second fallback: Use explicit firstName/lastName from frontend body
      else if (bodyFirstName) {
        finalFirstName = bodyFirstName;
        finalLastName = bodyLastName || null;
      }
      // 3. Third fallback: Both are null (handled by default)

      user = await User.create({
        firstName: finalFirstName,
        lastName: finalLastName,
        email,
        firebaseUid: uid,
        // passwordHash remains null since they are using Firebase
      });
    } else {
      // If user already exists but their names are null (e.g. created during testing before we added names), update them!
      if (!user.firstName && !user.lastName) {
        let updateFirstName = bodyFirstName;
        let updateLastName = bodyLastName;
        
        if (!updateFirstName && name) {
          const nameParts = name.split(" ");
          updateFirstName = nameParts[0];
          updateLastName = nameParts.slice(1).join(" ") || null;
        }

        if (updateFirstName || updateLastName) {
          user.firstName = updateFirstName || user.firstName;
          user.lastName = updateLastName || user.lastName;
          await user.save();
        }
      }
    }

    // 5. Generate our own local JWT to keep standard auth flow consistent across the app
    const secret = process.env.JWT_SECRET || "super_secret_jwt_key_please_change_in_production";
    const appToken = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      secret,
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      message: "Login successful",
      token: appToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileCompleted: user.profileCompleted,
        photoUrl: picture || null
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Firebase Login Error:", error);
    // Differentiate between generic errors and Firebase auth errors
    if (error.code && error.code.startsWith('auth/')) {
       return NextResponse.json({ error: "Invalid or expired Firebase token" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
