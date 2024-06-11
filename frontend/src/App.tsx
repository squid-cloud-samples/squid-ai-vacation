import './App.css';
import '@squidcloud/ui/styles/index.css';
import ItemList from './components/ItemList';
import { PackingItem } from '../../common/types';
import { useCollection, useQuery, useSquid } from '@squidcloud/react';
import SelectLocation from './components/SelectLocation';

function App() {
  const squid = useSquid();
  const collection = useCollection<PackingItem>('packing-list');
  const { data } = useQuery(collection.query().dereference());

  const handleToggle = async (id: string, done: boolean) => {
    await collection.doc({ id }).update({
      done,
    });
  };

  const handleDelete = async (id: string) => {
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
    <div className="background-container">
      <div className="content">
        <h1 style={{ color: 'white' }}>Vacation Planner</h1>
        <h3 style={{ color: 'white' }}>
          Enter your zip code and dates of travel to automatically generate a
          list of items based on the predicted weather forecast
        </h3>
        <SelectLocation onCreate={handleCreateWithAI} />
        <ItemList
          items={data}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
}

export default App;
