import "./ItemCard.scss";
import { PackingItem } from "../../../common/types";
import '@squidcloud/ui/styles/index.css';
import TrashIcon from "@squidcloud/ui/icons/trash.svg";

type PropTypes = {
  packingItem: PackingItem;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const ItemCard = ({ packingItem, onDelete, onToggle }: PropTypes) => {
  const { id, item, content, date, done, product_page_url, product_photo } = packingItem;

    const handleClick = () => {
      window.open(product_page_url, '_blank', 'noopener,noreferrer');
    };

  return (
    <div
      className={`sq-card item-card ${done ? 'done' : ''}`}
    >
      <input
        className='check-icon'
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id, !done)}
      />
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
      <div className="item-card__content">
        <h4>{item}</h4>
        <span>{content}</span>
        <span>{date.toDateString()}</span>
      </div>

      <div className="item-card__buttons">
        <button onClick={handleClick} className="sq-btn sq-btn--secondary" style={{width: "120px"}}>Buy Item</button>
        <button onClick={() => onDelete(id)} className="trash-icon">
          <img src={TrashIcon} width={32} className="sq-icon sq-icon--gray" />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
