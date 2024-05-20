import "./ItemCard.scss";
import { PackingItem } from "../../../common/types";

import TrashIcon from "@squidcloud/ui/icons/trash.svg";

type PropTypes = {
  packingItem: PackingItem;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const ItemCard = ({ packingItem, onDelete, onToggle }: PropTypes) => {
  const { id, item, content, imageUrl, date, done, product_description, product_page_url, product_photo, product_title } = packingItem;

  return (
    <div
      className={`sq-card sq-card--elevation2 item-card ${done ? 'done' : ''}`}
    >
      <div className="item-card__content">
        <h4>{item}</h4>
        <span>{content}</span>
        <span>{date.toDateString()}</span>
      </div>
      {product_photo && (
        <a href={product_page_url} target="_blank" rel="noopener noreferrer">
          <img
            alt={'item image'}
            title={'Click to view'}
            src={product_photo}
            className="item-card__image"
          />
        </a>
      )}
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
