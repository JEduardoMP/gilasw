import { useCallback, useEffect, useState } from 'react';
import { fetchData, Data } from '../Apis/FetchApi';
import { useStyle } from '../Context/styleContext';
import { DispatchStyleContext } from '../Constants/styleContext';

const DataFetcher = () => {
  const { TOGGLE } = DispatchStyleContext;
  const {
    state: { dark },
    dispatch,
  } = useStyle();
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataFromApi = useCallback(async () => {
    try {
      const result = await fetchData();
      setData(result);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unexpected error occurred');
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataFromApi();
  }, [fetchDataFromApi]);

  const toggleDarkMode = () => {
    dispatch({ type: TOGGLE });
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className={`App ${dark ? 'dark-mode' : ''}`}>
      <h1>App fetcher</h1>
      <button onClick={toggleDarkMode}>
        {dark ? 'Ligth theme' : 'Dark Theme'}
      </button>

      <div className='grid-layout'>
        {data.map((item) => (
          <div
            className={dark ? 'card-container-dark' : 'card-container'}
            key={item.id}
          >
            <p>Element {item.id}</p>
            <p>Title</p>
            <p>{item.title}</p>
            <p>Body</p>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataFetcher;
