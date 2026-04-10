import React, { useRef } from "react";
import { Modal } from "antd";
import ModalContent from "./modal-content";
import { IProps } from "./types";
import { addRequest, updateRequest } from "../api";

const ModalWapper: React.FC<IProps> = ({
    mode = "add",
    contentProps = {},
    ...otherModalProps
}) => {
    const { onOk: onOkProps } = otherModalProps;

    const modalContentRef = useRef<any>(null);
    const formPageModeLabelMap = {
        add: "新增",
        edit: "编辑",
        view: "查看",
    };

    async function onOk(e) {
        // 调用内容组件抛出的某个事件 自定义后续行为
        const values = await modalContentRef.current?.getValues();
        const res =
            mode === "add"
                ? await addRequest(values)
                : await updateRequest(values);
        // 如果需要在确定按钮回传数据做其他处理则调用
        onOkProps?.(e, {});
    }

    return (
        <Modal
            title={formPageModeLabelMap[mode]}
            {...otherModalProps}
            onOk={onOk}
        >
            <ModalContent ref={modalContentRef} {...contentProps} mode={mode} />
        </Modal>
    );
};

export default ModalWapper;
