import { type NextRequest, NextResponse } from 'next/server';
import { getId } from './helpers/auth';

export const proxy = async (request: NextRequest) => {
    const id = getId();

    if (!id) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/todos'], // Apply middleware to specific routes
};
