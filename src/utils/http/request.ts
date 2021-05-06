import fetch from 'node-fetch';
import { GithubCredentials } from '../../types/github';

export const sendGetRequest = async <T>(url: string, token: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Authorization': token
      }
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const sendPostRequest = async <T>(url: string, body: GithubCredentials): Promise<T> => {
  console.log(`Body: ${JSON.stringify(body)}`);

  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
