import { NextResponse } from "next/server";
import { verifyUser } from "../../../../lib/middleware/auth.js";
import { User } from "../../../../lib/models/user.js";
import { UserProfile } from "../../../../lib/models/userProfile.js";
import { completeProfileSchema } from "../../../../lib/validations/userAuth.js";
import { saveUploadedFile } from "../../../../lib/utils/uploadService.js";

export async function POST(request) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    const formData = await request.formData();
    
    // Extract text fields
    const dateOfBirth = formData.get("dateOfBirth");
    const phoneNumber = formData.get("phoneNumber");
    const socialLink = formData.get("socialLink");
    const bio = formData.get("bio");
    const socialEnergy = formData.get("socialEnergy");
    
    // Arrays come as JSON strings or multiple fields. We'll assume JSON strings from frontend for simplicity:
    let preferredNeighborhoods = [];
    let friendshipGoals = [];
    let availability = [];

    try {
      preferredNeighborhoods = formData.get("preferredNeighborhoods") ? JSON.parse(formData.get("preferredNeighborhoods")) : [];
      friendshipGoals = formData.get("friendshipGoals") ? JSON.parse(formData.get("friendshipGoals")) : [];
      availability = formData.get("availability") ? JSON.parse(formData.get("availability")) : [];
    } catch (e) {
      return NextResponse.json({ error: "Invalid array data format" }, { status: 400 });
    }

    const payload = {
      dateOfBirth,
      phoneNumber,
      socialLink: socialLink || undefined,
      bio: bio || undefined,
      socialEnergy: socialEnergy || undefined,
      preferredNeighborhoods,
      friendshipGoals,
      availability
    };

    const validationResult = completeProfileSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    // Extract File
    const imageFile = formData.get("profileImage");
    let imagePath = null;

    if (imageFile && typeof imageFile === 'object' && imageFile.name) {
      const uploadResult = await saveUploadedFile(imageFile, user.id, 5);
      
      if (uploadResult.error) {
        return NextResponse.json({ error: uploadResult.error }, { status: 400 });
      }

      // Store just the raw filename in the DB (frontend will construct /uploads/userId/filename)
      imagePath = uploadResult.fileName;
    }

    // Upsert UserProfile
    let profile = await UserProfile.findOne({ where: { userId: user.id } });
    if (profile) {
      await profile.update({
        dateOfBirth,
        phoneNumber,
        socialLink,
        bio,
        socialEnergy,
        preferredNeighborhoods,
        friendshipGoals,
        availability,
        ...(imagePath && { profileImage: imagePath })
      });
    } else {
      profile = await UserProfile.create({
        userId: user.id,
        dateOfBirth,
        phoneNumber,
        socialLink,
        bio,
        socialEnergy,
        preferredNeighborhoods,
        friendshipGoals,
        availability,
        profileImage: imagePath
      });
    }

    // Update User model to set profileCompleted
    await User.update({ profileCompleted: true }, { where: { id: user.id } });

    return NextResponse.json({
      message: "Profile completed successfully",
      profile
    }, { status: 200 });

  } catch (err) {
    console.error("Complete Profile API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
