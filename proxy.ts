import { NextRequest, NextResponse } from "next/server";
import { sessionService } from "./src/Services/session.service";

export const Roles = {
    admin: "ADMIN",
    student: "STUDENT",
    tutor: "TUTOR"
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const { data } = await sessionService.getSession();
    const user = data?.user;
    const isAuthenticated = !!user;
    const userRole = user?.role;

    const isAuthRoute = pathname === '/login' || pathname === '/register/tutor-registration' || pathname === '/register/student-registration';
    
    const isDashboardRoute = pathname.startsWith('/admin-dashboard') || pathname.startsWith('/tutor-dashboard') || pathname.startsWith('/student-dashboard');

    if(isAuthenticated && isAuthRoute){
        if(userRole === Roles.admin){
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }
        if(userRole === Roles.tutor){
            return NextResponse.redirect(new URL('/tutor-dashboard', request.url));
        }
        if(userRole === Roles.student){
            return NextResponse.redirect(new URL('/student-dashboard', request.url));
        }
    }

    if(!isAuthenticated && isDashboardRoute){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if(isAuthenticated && isDashboardRoute){
        if(userRole === Roles.admin && !pathname.startsWith('/admin-dashboard')){
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }
        if(userRole === Roles.tutor && !pathname.startsWith('/tutor-dashboard')){
            return NextResponse.redirect(new URL('/tutor-dashboard', request.url));
        }
        if(userRole === Roles.student && !pathname.startsWith('/student-dashboard')){
            return NextResponse.redirect(new URL('/student-dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin-dashboard/:path*", "/tutor-dashboard/:path*", "/student-dashboard/:path*", "/login", "/register/tutor-registration", "/register/student-registration"]
}