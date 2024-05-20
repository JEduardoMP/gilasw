export interface Data {
    id: number;
    userId: string;
    title: string;
    body: string;
  }
  
  export const fetchData = async (): Promise<Data[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result: Data[] = await response.json();
    return result;
  };
  