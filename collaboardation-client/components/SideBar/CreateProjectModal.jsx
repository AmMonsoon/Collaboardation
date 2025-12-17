import { useState } from "react"

const CreateProjectModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate(title);
    onClose();
  };

  return (
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
    </div>
  );
};

export default CreateProjectModal;