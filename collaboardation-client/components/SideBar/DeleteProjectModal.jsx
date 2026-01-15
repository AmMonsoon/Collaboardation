import { createPortal } from "react-dom"
import useEscapeKey from "../../hooks/useEscape"
const modalRoot = document.getElementById("modal-root")
const DeleteProjectModal = ({onClose, onConfirm, projectTitle}) => {

    useEscapeKey(onClose)

    const handleSubmit = () => {
        onConfirm()
        onClose()
    }

    return createPortal(
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h4>Are you sure you want to delete this {projectTitle}?</h4>
                <div className="modal-actions">
                        <button onClick={onClose}>Cancel</button>
                        <button onClick={handleSubmit}>Confirm</button>
                </div>
            </div>
        </div>,
        modalRoot
    )
}

export default DeleteProjectModal;