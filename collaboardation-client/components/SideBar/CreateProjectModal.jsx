import { createPortal } from "react-dom";
import { useState } from "react"

const modalRoot =  document.getElementById("modal-root")

const CreateProjectModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate(title);
    onClose();
  };

  return createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <h3>New Project</h3>

        <input
          placeholder="Project name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default CreateProjectModal;