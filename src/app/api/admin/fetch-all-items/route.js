"use server";
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import Optical from "@/utils/models/Item";

export async function GET(req) {
  const findItem = await Optical.find({});

  if (findItem) {
    return Response.json({
      Success: true,
      msg: "Fetching Items",
      items: findItem,
    });
  } else {
    return Response.json({
      Success: false,
      msg: "No Items Found",
      items: [],
    });
  }
}
