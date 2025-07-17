export const API_ENDPOINT = {
  todos: {
    getIndex: "http://localhost:3001/todos",
    postStore: "http://localhost:3001/todos",
    putUpdate: (id: string) => `http://localhost:3001/todos/${id}`,
    delete: (id: string) => `http://localhost:3001/todos/${id}`,
  },
};