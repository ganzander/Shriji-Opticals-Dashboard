"use server";
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import Optical from "@/utils/models/Item";

export async function POST(req) {
  const { category, price, ageCategory, name, brand, images } =
    await req.json();
  if (!category) {
    return Response.json({ Success: false, msg: "Enter the category" });
  } else if (!price) {
    return Response.json({ Success: false, msg: "Enter the price" });
  } else if (!ageCategory) {
    return Response.json({ Success: false, msg: "Enter the age category" });
  } else if (!name) {
    return Response.json({ Success: false, msg: "Enter the name" });
  } else if (!brand) {
    return Response.json({ Success: false, msg: "Enter the brand" });
  } else if (!images) {
    return Response.json({ Success: false, msg: "Enter the images" });
  }

  try {
    const opticalItem = new Optical({
      category,
      price,
      ageCategory,
      name,
      brand,
      images,
    });
    const newItem = await Optical.create(opticalItem);

    return Response.json({
      Success: true,
      msg: "Added a new item",
      itemId: newItem._id,
    });
  } catch (err) {
    console.log(err);
  }

  return Response.json({
    Success: false,
    msg: "Unable to add a new item",
  });
}
