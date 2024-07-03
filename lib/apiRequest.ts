import toast from "react-hot-toast";



//@ts-ignore
export async function makeApiRequest(setLoading, url, data, resourceName, reset) {

    try {
        console.log(data);
        setLoading(true)
        const response = await fetch(`${process.env.URL}/api/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            console.log(response);
            toast.success(`${resourceName} created successfully`)
            reset()
            setLoading(false)
        }
        else {
            setLoading(false)
            toast.error('Something went wrong')
        }
    } catch (error) {
        console.log(error);
        setLoading(false)
        toast.error('Something went wrong')
    }
}

