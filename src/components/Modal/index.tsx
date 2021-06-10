import { Component, useState } from "react";
import ReactModal from "react-modal";

export function Modal(props: any) {
  const { isOpen } = props;
  const [open, setOpen] = useState(isOpen);
  let state = {
    modalStatus: isOpen,
  };

  function componentDidUpdate(prevProps: any) {
    if (prevProps.isOpen !== isOpen) {
      console.log(props);
      setOpen({ modalStatus: isOpen });
    }
  }
  const { children, setIsOpen } = props;
  const { modalStatus } = state;

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#F0F0F5",
          color: "#000000",
          borderRadius: "8px",
          width: "736px",
          border: "none",
        },
        overlay: {
          backgroundColor: "#121214e6",
        },
      }}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
