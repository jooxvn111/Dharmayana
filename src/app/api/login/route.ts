import { NextResponse } from "next/server";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Username atau password salah" },
        { status: 400 }
      );
    }

    const token = "STATIC-TOKEN-123";

    const res = NextResponse.json(
      {
        success: true,
        message: "Login sukses",
        redirect: "/admin",
        token: token,
      },
      { status: 200 }
    );

    res.cookies.set("authToken", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      path: "/",
    });

    return res;

  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
