async function fetchServer({method = "GET", endpoint = "test", body = "", headers}) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + endpoint.toString(), {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
            },
            body: body || undefined,
        });

        if (response.ok) {
            return response;
        }
    } catch (error) {
        throw new Error("Failed to fetch data from the server", {cause: error});
    }
}

export default fetchServer;
