import type { ModalProps } from "antd";

export const MODAL_MODE = {
    NEW: "new",
    EDIT: "edit",
    VIEW: "view",
} as const;

export type TModalMode = (typeof MODAL_MODE)[keyof typeof MODAL_MODE];

interface ICustomProps {
    mode?: TModalMode;
    customFooterRender?: Function;
    okAuthKey?: string;
    contentProps?: Record<string, any>;
    onOk: (event: React.MouseEvent<HTMLElement>, additionalInfo: any) => void;
}

export type IProps = ICustomProps & Omit<ModalProps, "onOk">;

export interface IModalContentProps {
    mode: TModalMode;
    initialValues?: any;
}
