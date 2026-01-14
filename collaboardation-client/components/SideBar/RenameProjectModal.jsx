import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

const modalRoot = document.getElementById("modal-root")
const RenameProjectModal = ({onClose, onRename, currentTitle}) => {
    const [title, setTitle] = useState(currentTitle)

    useEffect(() => {
        setTitle(currentTitle)
    },[currentTitle])

    const handleSubmit = () => {
        if (!title.trim()) return;
        onRename(title);
        onClose();
    }

    return createPortal(
        <div className="modal-backdrop">
            <div className="modal">
                <input
                    placeholder="Project name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit}>Confirm</button>
                </div>
            </div>
        </div>,
        modalRoot
    )
}

export default RenameProjectModal;