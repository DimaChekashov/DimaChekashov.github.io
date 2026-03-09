import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../_utils/adminAuth";

export async function GET(request: NextRequest) {
  const auth = await getAuthenticatedAdmin(request);

  if (!auth.user) {
    return auth.errorResponse;
  }

  return NextResponse.json(auth.user);
}
