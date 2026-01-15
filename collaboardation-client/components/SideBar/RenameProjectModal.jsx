import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import useEscapeKey from "../../hooks/useEscape"

const modalRoot = document.getElementById("modal-root")
const RenameProjectModal = ({onClose, onRename, currentTitle}) => {

    useEscapeKey(onClose)
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
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
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