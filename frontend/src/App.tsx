import './App.css';
import '@squidcloud/ui/styles/index.css';
import ItemList from './components/ItemList';
import { PackingItem } from './components/types';
import { useCollection, useQuery, useSquid } from '@squidcloud/react';
import SelectLocation from './components/SelectLocation';
import { useState } from 'react';

function App() {
  const squid = useSquid();
  const collection = useCollection<PackingItem>('packing-list');
  const { data } = useQuery(collection.query().dereference());
  const [btnDisabled, setBtnDisabled] = useState(false);

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
    setBtnDisabled(true);
    await squid.executeFunction(
      'createItemsWithAI',
      zipcode,
      startDate,
      endDate,
    );
    setBtnDisabled(false);
  };

  return (
    <div>
      <div className="background-container">
        <div className="background-container__content">
          <div className='background-container__content__title'>Vacation Planner</div>
          <div className="background-container__content__desc">
            Enter your zip code and dates of travel to automatically generate a
          </div>
          <div className="background-container__content__desc">
            list of items based on the predicted weather forecast
          </div>
          <SelectLocation btnDisabled={btnDisabled} onCreate={handleCreateWithAI} />
        </div>
      </div>
      <div className="content">
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
