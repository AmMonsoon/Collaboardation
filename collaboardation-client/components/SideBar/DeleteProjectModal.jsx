
const DeleteProjectModal = ({onClose, onConfirm, projectTitle}) => {

    const handleSubmit = () => {
        onConfirm()
        onClose()
    }

    return(
        <>
            <h4>Are you sure you want to delete this {projectTitle}?</h4>
            <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit}>Confirm</button>
             </div>
        </>
    )
}

export default DeleteProjectModal;