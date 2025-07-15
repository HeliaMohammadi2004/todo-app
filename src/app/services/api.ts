export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const API_ENDPOINT = {
  todos: {
    getIndex: `${BASE_URL}/todos`,            
    getShow: (id: number) => `${BASE_URL}/todos/${id}`, 
    postStore: `${BASE_URL}/todos`,           
    putUpdate: (id: number) => `${BASE_URL}/todos/${id}`, 
    delete: (id: number) => `${BASE_URL}/todos/${id}`,
  },
};
