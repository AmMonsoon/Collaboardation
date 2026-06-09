import { createPortal } from "react-dom";
import { useState } from "react"
import useEscapeKey from "../../hooks/useEscape";

const modalRoot =  document.getElementById("modal-root")

const CreateProjectModal = ({ onClose, onCreate }) => {
  useEscapeKey(onClose)

  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate(title);
    onClose();
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>New Project</h3>

        <input
          data-testid= "project-title-input"
          placeholder="Project name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button 
          data-testid="submit-project-button"
          onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default CreateProjectModal;