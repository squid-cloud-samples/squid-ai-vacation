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
  const { id, item, content, imageUrl, date, done } = todo;

  return (
    <div
      className={`sq-card sq-card--elevation2 item-card ${done ? 'done' : ''}`}
    >
      <div className="item-card__content">
        <h4>{item}</h4>
        <span>{content}</span>
        <span>{date.toDateString()}</span>
      </div>
      {imageUrl && <img src={imageUrl} className="item-card__image"/>}
      <div className="item-card__buttons">
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
