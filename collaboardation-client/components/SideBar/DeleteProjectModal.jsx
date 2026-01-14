import { createPortal } from "react-dom"
const modalRoot = document.getElementById("modal-root")
const DeleteProjectModal = ({onClose, onConfirm, projectTitle}) => {

    const handleSubmit = () => {
        onConfirm()
        onClose()
    }

    return createPortal(
        <div className="modal-backdrop">
            <div className="modal">
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