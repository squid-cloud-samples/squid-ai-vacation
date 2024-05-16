import './App.css';
import '@squidcloud/ui/styles/index.css';

import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import { PackingItem } from '../../common/types';
import { useCollection, useQuery, useSquid } from '@squidcloud/react';
import SelectLocation from './components/SelectLocation';

function App() {
  const squid = useSquid();

  const collection = useCollection<PackingItem>('packing-list');

  const { data } = useQuery(collection.query().dereference());

  const handleCreate = async (data: Pick<PackingItem, 'item' | 'content'>) => {
    const { item, content } = data;
    const id = crypto.randomUUID();
    const date = new Date();
    const dateString = date.toDateString();
    await collection.doc({ id }).insert({
      id,
      item,
      content,
      date: dateString,
      done: false,
    });
  };

  const handleToggle = async (id: string, done: boolean) => {
    await collection.doc({ id }).update({
      done,
    });
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    console.log('delete')
    await collection.doc({ id }).delete();
  };

  const handleCleanItems = async () => {
    await squid.executeFunction('cleanTodos');
  };

  const handleCreateWithAI = async (
    zipcode: string,
    startDate: Date,
    endDate: Date,
  ) => {
    console.log({zipcode, startDate, endDate})
    await squid.executeFunction(
      'createItemsWithAI',
      zipcode,
      startDate,
      endDate,
      
    );
  };

  return (
    <>
      <div className="app-buttons">
        <AddItem onCreate={handleCreate} />
        <button className="sq-btn sq-btn--secondary" onClick={handleCleanItems}>
          Clean Items
        </button>
      </div>
      <SelectLocation onCreate={handleCreateWithAI} />
      <ItemList todos={data} onDelete={handleDelete} onToggle={handleToggle} />
    </>
  );
}

export default App;
