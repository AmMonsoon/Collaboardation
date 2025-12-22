import { useState, useEffect } from "react"

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

    return(
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
        </div>
    )
}

export default RenameProjectModal;