import axios from 'axios';
import { GithubCredentials } from '../../types/github';


export const sendPostRequest = async (url: string, body: GithubCredentials) => {
  try {
    const data = await axios(url, {
      headers: {
        'Accept': 'application/json'
      },
      data: body,
      method: 'POST'
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const sendGetRequest = async (url: string, accessToken: string) => {
  try {
    const {data} = await axios(url, {
      headers: {
        'Authorization': accessToken
      },
      method: 'GET'
    });

    console.log(`User data inside get: ${data}`);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const sendGetRequest2 = async (url: string, accessToken: string) => {
  try {
    const {data} = await axios(url, {
      headers: {
        'Authorization': `token ${accessToken}`
      },
      method: 'GET'
    });

    console.log(`User data inside get: ${data}`);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
