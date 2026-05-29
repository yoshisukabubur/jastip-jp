import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Missing env or session — still return user to home.
  }
  return NextResponse.redirect(new URL("/", request.url));
}
