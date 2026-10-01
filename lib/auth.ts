import { getUser, verifyRequestOrigin, type User } from "@netlify/identity";

// Resolves the signed-in Identity user, or returns a 401 response.
export async function requireUser(req: Request): Promise<User | Response> {
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      verifyRequestOrigin(req);
    } catch {
      return Response.json({ error: "Invalid request origin" }, { status: 403 });
    }
  }
  const user = await getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return user;
}
