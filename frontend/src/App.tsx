import './App.css';
import '@squidcloud/ui/styles/index.css';
import ItemList from './components/ItemList';
import { PackingItem, OneDayForecast } from '../../common/types';
import { useCollection, useQuery, useSquid } from '@squidcloud/react';
import SelectLocation from './components/SelectLocation';
import Forecast from './components/Forecast';

function App() {
  const squid = useSquid();

  const collection = useCollection<PackingItem>('packing-list');
  const forecastColleciton = useCollection<OneDayForecast>('forecast');

  const { data } = useQuery(collection.query().dereference());
  const forecastResult = useQuery(forecastColleciton.query().dereference());

  const handleToggle = async (id: string, done: boolean) => {
    await collection.doc({ id }).update({
      done,
    });
  };

  const handleDelete = async (id: string) => {
    // const snapshot = await forecastColleciton.query().snapshot();
    // await forecastColleciton.doc(snapshot[0].data.__id).delete();
    await collection.doc({ id }).delete();

  };

  const handleCreateWithAI = async (
    zipcode: string,
    startDate: Date,
    endDate: Date,
  ) => {
    await squid.executeFunction(
      'createItemsWithAI',
      zipcode,
      startDate,
      endDate,
    );
  };

  return (
    <>
      <h1>Vacation Planner</h1>
      <h3>Enter your zip code and dates of travel to automatically generate a list of items based on the predicted weather forecast</h3>
      <SelectLocation onCreate={handleCreateWithAI} />
      {/* {forecastResult && <Forecast forecast={forecastResult.data[0]} /> } */}
      <ItemList items={data} onDelete={handleDelete} onToggle={handleToggle} />
    </>
  );
}

export default App;
