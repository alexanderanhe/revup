import axios from "axios";
const account_id = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;

export async function listImages() {
  try {
    const response = await axios.get(`https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.result.images;
  } catch (e) {
    console.error(e);
    return null
  }
}

export async function deleteImage(imageId: string) {
  try {
    await axios.delete(`https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/${imageId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function uploadImages(files: FileList) {
  try {
    const responses: Promise<any>[] = [];
    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      responses.push(axios.post(`https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }));
    });
    return await Promise.all(responses);
  } catch (e) {
    console.error(e);
    throw e;
  }
}