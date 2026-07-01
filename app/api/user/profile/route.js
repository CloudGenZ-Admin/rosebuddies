import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/middleware/auth.js";
import { User } from "@/lib/models/index.js";
import { UserProfile } from "@/lib/models/index.js";
import { editProfileSchema } from "@/lib/validations/userAuth.js";
import { saveUploadedFile } from "@/lib/utils/uploadService.js";

export async function PUT(request) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    const formData = await request.formData();
    
    // Extract text fields
    const payload = {};
    if (formData.has("firstName")) payload.firstName = formData.get("firstName");
    if (formData.has("lastName")) payload.lastName = formData.get("lastName");
    if (formData.has("dateOfBirth")) payload.dateOfBirth = formData.get("dateOfBirth");
    if (formData.has("phoneNumber")) payload.phoneNumber = formData.get("phoneNumber");
    if (formData.has("socialLink")) payload.socialLink = formData.get("socialLink");
    if (formData.has("bio")) payload.bio = formData.get("bio");

    const validationResult = editProfileSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    // Extract File (if new one provided)
    const imageFile = formData.get("profileImage");
    let imagePath = null;

    if (imageFile && typeof imageFile === 'object' && imageFile.name) {
      const uploadResult = await saveUploadedFile(imageFile, user.id, 5);
      if (uploadResult.error) {
        return NextResponse.json({ error: uploadResult.error }, { status: 400 });
      }
      imagePath = uploadResult.fileName;
    }

    // Update User model (firstName, lastName)
    const userUpdates = {};
    if (payload.firstName) userUpdates.firstName = payload.firstName;
    if (payload.lastName) userUpdates.lastName = payload.lastName;
    
    if (Object.keys(userUpdates).length > 0) {
      await User.update(userUpdates, { where: { id: user.id } });
    }

    // Update UserProfile model
    const profileUpdates = {};
    if (payload.dateOfBirth !== undefined) profileUpdates.dateOfBirth = payload.dateOfBirth;
    if (payload.phoneNumber !== undefined) profileUpdates.phoneNumber = payload.phoneNumber;
    if (payload.socialLink !== undefined) profileUpdates.socialLink = payload.socialLink;
    if (payload.bio !== undefined) profileUpdates.bio = payload.bio;
    if (imagePath) profileUpdates.profileImage = imagePath;

    let profile = await UserProfile.findOne({ where: { userId: user.id } });
    
    if (profile) {
      if (Object.keys(profileUpdates).length > 0) {
        await profile.update(profileUpdates);
      }
    } else {
      // Fallback in case they somehow missed complete-profile step
      profile = await UserProfile.create({
        userId: user.id,
        ...profileUpdates
      });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      profile
    }, { status: 200 });

  } catch (err) {
    console.error("Edit Profile API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
