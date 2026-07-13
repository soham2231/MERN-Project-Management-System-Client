// import { Modal } from "react-bootstrap";

// const CustomModal = ({
//   show,
//   onHide,
//   title,
//   children,
//   size = "lg",
// }) => {
//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       centered
//       size={size}
//     >
//       <Modal.Header
//         closeButton
//         className="modal-dark"
//       >
//         <Modal.Title>{title}</Modal.Title>
//       </Modal.Header>

//       <Modal.Body className="modal-dark">
//         {children}
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default CustomModal;

const CustomModal = ({ show, onClose, title, children, width = "700px" }) => {
  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal" style={{ maxWidth: width }}>
        <div className="custom-modal-header">
          <h4>{title}</h4>

          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="custom-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
