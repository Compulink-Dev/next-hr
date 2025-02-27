import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId for conversion

// 📌 CREATE NEW LOG
// 📌 CREATE NEW LOG
export async function POST(req: Request) {
  try {
    // Get session to extract userId
    const session = await getServerSession(authOptions);

    // Log the session for debugging
    console.log("Session:", session);

    // Check if session exists and user has an ID
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Convert the userId to ObjectId
    const userId = new ObjectId(session.user.id);

    // Parse the request data
    const { date, time, mileage, details, remarks } = await req.json();

    // Set current server date and time if not provided
    const currentDate = new Date();
    const parsedDate = date ? new Date(date) : currentDate;
    const parsedTime =
      time || currentDate.toISOString().split("T")[1].split(".")[0];

    // Convert `mileage` to number and ensure `date` is a valid Date
    const parsedMileage = parseInt(mileage, 10); // Ensure mileage is an integer

    // Check if parsedMileage is a valid number
    if (isNaN(parsedMileage)) {
      return NextResponse.json(
        { error: "Invalid mileage value" },
        { status: 400 }
      );
    }

    // Check if parsedDate is a valid Date
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date value" },
        { status: 400 }
      );
    }

    // Create a new log with the session's user ID (converted to ObjectId)
    const newLog = await db.log.create({
      data: {
        date: parsedDate, // Use the parsed or current date
        time: parsedTime, // Use the parsed or current time
        mileage: parsedMileage, // Use the parsed mileage
        details,
        remarks,
        userId: userId, // Add userId here, converted to ObjectId
      },
    });

    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating log entry:", error);

    return NextResponse.json(
      { error: "Failed to create log" },
      { status: 500 }
    );
  }
}

// 📌 GET ALL LOGS
export async function GET() {
  try {
    const logs = await db.log.findMany({
      orderBy: { date: "desc" },
      include: {
        user: {
          select: {
            name: true, // Adjust based on your User model field
          },
        },
      },
    });
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}
