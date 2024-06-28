import fetchServer from '@/lib/fetch-server';
import { NextResponse } from 'next/server';

export async function GET(request, response, next) {
    try {
        const { pathname } = new URL(request.url);
        const endpoint = pathname.replace('/api/', '/');
        const backendResponse = await fetchServer({
            method: 'GET',
            endpoint: endpoint,
        });

        const data = await backendResponse.json();
        return NextResponse.json(data, {
            status: backendResponse.status,
        });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: err.status || 500 });
    }
}
