import toast from "react-hot-toast";

export async function makeApiRequest(
  setLoading: (loading: boolean) => void,
  url: string,
  data: any = {},
  resourceName: string,
  reset: () => void,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST'
) {
  try {
    setLoading(true);
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Only add body for non-GET requests
    if (method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`/api/${url}`, options);

    if (!response.ok) {
      if (response.status === 401) {
        toast.error('Unauthorized. Please sign in.');
      } else if (response.status === 403) {
        toast.error('Forbidden. You do not have permission to perform this action.');
      } else {
        toast.error('Request failed');
      }
      throw new Error('Request failed');
    }

    const responseData = await response.json();
    
    if (method !== 'GET') {
      toast.success(`${resourceName} updated successfully`);
      reset();
    }

    return responseData; // Return the response data
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong');
    throw error; // Re-throw the error for handling in the calling function
  } finally {
    setLoading(false);
  }
}