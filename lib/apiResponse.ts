
export async function getData(endpoint: any) {
    try {
        const response = await fetch(`${process.env.URL}/api/${endpoint}`, {
            cache: 'no-store'
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error);
    }
}