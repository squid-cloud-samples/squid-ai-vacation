import ItemCard from "./ItemCard";
import "./ItemList.scss";
import { PackingItem } from "../../../common/types";

type PropTypes = {
  todos: Array<PackingItem>;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const ItemList = ({ todos, onDelete, onToggle }: PropTypes) => {
  return (
    <div className="todo-list">
      <div className="todo-list__column">
        {todos.map((todo) => (
          <ItemCard
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
