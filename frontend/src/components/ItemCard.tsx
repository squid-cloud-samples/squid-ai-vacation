import dayjs from "dayjs";
import "./ItemCard.scss";
import { PackingItem } from "../../../common/types";

import TrashIcon from "@squidcloud/ui/icons/trash.svg";

type PropTypes = {
  todo: PackingItem;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const ItemCard = ({ todo, onDelete, onToggle }: PropTypes) => {
  const { id, item, content, date, done } = todo;

  return (
    <div
      className={`sq-card sq-card--elevation2 todo-card ${done ? 'done' : ''}`}
    >
      <div className="todo-card__content">
        <h4>{item}</h4>
        <span>{content}</span>
        <span>{date}</span>
      </div>
      <div className="todo-card__buttons">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id, !done)}
        />
        <button onClick={() => onDelete(id)}>
          <img src={TrashIcon} width={32} className="sq-icon sq-icon--gray" />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
