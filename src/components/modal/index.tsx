import React, { useState } from 'react';
import { Modal as BaseModal, Button } from 'antd';
import { ModalProps } from 'antd/lib/modal';

export interface IModal extends ModalProps {
    title?: string;
    visible?: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    buttonText?: string;
    isButtonDisabled?: boolean;
}
export const Modal: React.FC<IModal> = ({
    title = 'Basic Modal',
    buttonText = 'Open Modal',
    isButtonDisabled,
    visible = false,
    children,
    ...rest
}) => {
    const [isModalVisible, setIsModalVisible] = useState(visible);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                disabled={isButtonDisabled}
            >
                {buttonText}
            </Button>
            <BaseModal
                {...rest}
                title={title}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="Go Back"
                okText="Checkout"
            >
                {children}
            </BaseModal>
        </>
    );
};
