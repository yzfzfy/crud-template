'use client';
import React, { useState, useEffect } from 'react';
import {
    Button,
    Badge,
    App,
    Flex,
    Typography,
    Descriptions,
    Spin,
    Space,
    Card,
    ConfigProvider,
    Form,
    Col,
    Row,
    Result,
    Radio,
    Modal,
    QRCode,
} from 'antd';
import {
    ProForm,
    ProFormInstance,
    ProFormDateTimePicker,
    ProFormTextArea,
    ProFormText,
    ProFormDigit,
    ProFormRadio,
    ProFormSelect,
} from '@ant-design/pro-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMount } from 'ahooks';
import { formPageModeLabelMap } from '@/constants';
import { addRequest, detailRequest, updateRequest } from '../api';
import { useStyles } from './style';

const Page = () => {
    const { message, modal } = App.useApp();
    const searchParams = useSearchParams();
    const router = useRouter();
    const mode = (searchParams.get('mode') as keyof typeof formPageModeLabelMap) || 'add';
    const { styles } = useStyles();
    const [form] = Form.useForm();

    const id = searchParams.get('id');
    const [initialValues, setInitialValues] = useState();
    const [loading, setLoading] = useState(true);

    useMount(() => {
        // 非新建
        if (mode !== 'add') {
            // 初始化默认值
            // setInitialValues()
            // 举例 请求id参数的详情接口
            detailRequest({ id }).then((res: any) => {
                setInitialValues(res.data);
                setLoading(false);
            });
        } else {
            // 新建也可以设置一些默认值
            // setInitialValues()
            setLoading(false);
        }
    });

    const handleSave = async () => {
        const values = await form.validateFields();
        console.log(values);

        const data = {
            ...values,
        };

        const api = mode === 'add' ? addRequest : updateRequest;

        api(data).then((res: any) => {
            message.success('操作成功');
            router.back();
        });
    };

    const onValuesChange = (changeValues, allValues) => {};

    if (loading) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.pageTitle}>
                <Typography.Title level={5}>{`${formPageModeLabelMap[mode]}飞行计划`}</Typography.Title>
            </div>
            <div className={styles.content}>
                <ProForm
                    form={form}
                    initialValues={initialValues}
                    onValuesChange={onValuesChange}
                    size="middle"
                    layout="horizontal"
                    submitter={{
                        render: false,
                    }}
                    readonly={mode === 'view'}
                    wrapperCol={{ span: 16 }}
                    labelCol={{ span: 4 }}
                >
                    {/* 此字段隐藏：hidden 为了编辑模式保存时有值 */}
                    <ProFormText name="id" hidden label="ID" />
                </ProForm>
            </div>
            <div className={styles.footer}>
                <Space>
                    {mode !== 'view' && (
                        <Button type="primary" onClick={handleSave}>
                            保存
                        </Button>
                    )}
                    <Button onClick={() => router.back()}>取消</Button>
                </Space>
            </div>
        </div>
    );
};

export default Page;
