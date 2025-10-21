import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname, origin } = req.nextUrl;
    const role = req.nextauth?.token?.role as string | undefined;
    const method = req.method?.toUpperCase?.() ?? "GET";

    // Redirect legacy /admin paths into /dashboard to unify surfaces
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const newPath = pathname.replace(/^\/admin/, "/dashboard");
      const url = new URL(newPath, origin);
      return NextResponse.redirect(url);
    }

    // Admin-only route gates (server-side enforcement)
    const adminOnlyPrefixes = [
      "/dashboard/hr/employees",
      "/dashboard/projects/requisition",
    ];
    const isAdminOnly = adminOnlyPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
    if (isAdminOnly && role !== "admin") {
      const url = new URL("/dashboard", origin);
      return NextResponse.redirect(url);
    }

    // HR API authorization gates
    const adminApiPrefixes = [
      "/api/(hr)/employees",
      "/api/(hr)/payslip",
      "/api/(hr)/interviews/access",
    ];
    const isAdminApi = adminApiPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
    // Only restrict non-GET (write) operations
    if (isAdminApi && method !== "GET" && role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // HR status transitions: allow admin or hr
    const hrStatusMatch = pathname.match(/^\/api\/\(hr\)\/(leave|loans)\/[^/]+\/status/);
    if (hrStatusMatch && method !== "GET" && role !== "admin" && role !== "hr") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Proceed for other paths; withAuth will enforce auth where matched
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Require authentication for matched routes; role-based gating handled here and in app
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/(hr)/:path*",
  ],
};
