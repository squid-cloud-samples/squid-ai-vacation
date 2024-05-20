import ItemCard from "./ItemCard";
import "./ItemList.scss";
import { PackingItem } from "../../../common/types";

type PropTypes = {
  items: Array<PackingItem>;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const ItemList = ({ items, onDelete, onToggle }: PropTypes) => {
  return (
    <div className="item-list">
      <div className="item-list__column">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            packingItem={item}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
