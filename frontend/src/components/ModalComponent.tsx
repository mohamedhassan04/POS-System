import React from "react";
import { Divider, Modal } from "antd";
import { MdClose } from "react-icons/md";

export interface ModalComponentProps {
  title: string;
  children?: React.ReactNode;
  open?: boolean;
  modalStyle?: React.CSSProperties;
  onClose?: () => void;
  closeOnOutsideClick?: boolean;
  width?: number;
  showCloseIcon?: boolean;
  centered?: boolean;
  destroyOnClose?: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  children,
  modalStyle,
  open = false,
  onClose,
  closeOnOutsideClick,
  width,
  showCloseIcon = true,
  centered,
}) => {
  return (
    <>
      <Modal
        wrapClassName="ct--modal-container"
        style={{ top: 20, minHeight: "30vh", height: "30vh", ...modalStyle }}
        width={width}
        open={open}
        footer={null}
        title={
          <div>
            <span>{title}</span>
            <Divider />
          </div>
        }
        closeIcon={<MdClose />}
        onCancel={closeOnOutsideClick ? onClose : onClose}
        closable={showCloseIcon}
        centered={centered}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
