import fetchServer from '@/lib/fetch-server';

export async function GET(request, response, next) {
    try {
        const id = request.params.id;
        const endpoint = `/patients/${id}`;
        const backendResponse = await fetchServer({
            method: 'GET',
            endpoint: endpoint,
        });

        const data = await backendResponse.json();
        response.json(data);
    } catch (err) {
        next(err);
    }
}
