import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import "./AddItem.scss";
import { PackingItem } from "../../../common/types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

type FormValues = Pick<PackingItem, "item" | "content">;

type PropTypes = {
  onCreate: (data: FormValues) => void;
};

const AddItem = ({ onCreate }: PropTypes) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm<FormValues>();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    reset();
  }

  return (
    <div>
      <button className="sq-btn" onClick={openModal}>
        Add Todo
      </button>
      <Modal
        className="sq-modal__content"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form
          className="sq-card create-modal__content"
          onSubmit={handleSubmit(async (data) => {
            await onCreate(data);
            closeModal();
          })}
        >
          <div className="sq-input">
            <label> Title</label>
            <input {...register("item")} />
          </div>
          <div className="sq-input">
            <label>Content</label>
            <textarea rows={5} {...register("content")} />
          </div>
          <div className="create-modal__buttons">
            <button className="sq-btn" type="submit">
              Add
            </button>
            <button className="sq-btn sq-btn--outline" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddItem;
