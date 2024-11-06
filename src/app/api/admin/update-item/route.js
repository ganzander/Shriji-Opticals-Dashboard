"use server";
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import Optical from "@/utils/models/Item";

export async function POST(req) {
  const { itemid, category, price, ageCategory, name, brand, gender, color } =
    await req.json();

  const requiredFields = {
    itemid,
    category,
    price,
    name,
    brand,
    ageCategory,
    gender,
    color,
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return Response.json({ Success: false, msg: `Enter your ${field}` });
    }
  }

  try {
    const updatedItem = await Optical.findByIdAndUpdate(
      itemid,
      { category, price, name, brand, ageCategory, gender, color },
      { new: true, runValidators: true }
    );

    if (updatedItem) {
      return Response.json({
        Success: true,
        msg: "Updated the item",
        itemId: itemid,
        updatedItem,
      });
    } else {
      return Response.json({
        Success: false,
        msg: "Invalid Item Id. Re-enter the Item Id.",
      });
    }
  } catch (error) {
    return Response.json({
      Success: false,
      msg: "An error occurred while updating the item.",
      error: error.message,
    });
  }
}
