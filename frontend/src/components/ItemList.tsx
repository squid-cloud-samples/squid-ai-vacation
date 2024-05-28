import ItemCard from "./ItemCard";
import "./ItemList.scss";
import { PackingItem } from "../../../common/types";
import '@squidcloud/ui/styles/index.css';


type PropTypes = {
  items: Array<PackingItem>;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const ItemList = ({ items, onDelete, onToggle }: PropTypes) => {
  return (
    <div className="item-list">
      <div className="item-list__column">
        <div className="header">Items to pack</div>
        <div>
          {items
            .filter((item) => !item.done)
            .map((item) => (
              <ItemCard
                key={item.id}
                packingItem={item}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
        </div>
        <div className="header">Items packed</div>
        <div>
          {items
            .filter((item) => item.done)
            .map((item) => (
              <ItemCard
                key={item.id}
                packingItem={item}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
