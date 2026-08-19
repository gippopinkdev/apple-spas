export async function loadCampaignData(baseUrl) {
    const [districtResponse, candidatesResponse] = await Promise.all([
        fetch(`${baseUrl}districts.json`),
        fetch(`${baseUrl}candidates.json`),
    ]);

    return {
        districtMap: await districtResponse.json(),
        candidates: await candidatesResponse.json(),
    };
}

export async function loadMapSvg(baseUrl) {
    const response = await fetch(`${baseUrl}map.svg`);

    if (!response.ok) {
        throw new Error(`Failed to load map.svg: ${response.status}`);
    }

    return response.text();
}
