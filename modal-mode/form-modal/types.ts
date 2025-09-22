import type { ModalProps } from 'antd';

type TMode = 'add' | 'edit' | 'view';

interface ICustomProps {
    mode?: TMode;
    customFooterRender?: Function;
    okAuthKey?: string;
    contentProps?: Record<string, any>;
    onOk: (event: React.MouseEvent<HTMLElement>, additionalInfo: any) => void;
}

export type IProps = ICustomProps & Omit<ModalProps, 'onOk'>;

export interface IModalContentProps {
    mode: TMode;
    initialValues?: any;
}
