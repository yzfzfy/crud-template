'use client';
import React, { useRef, useState } from 'react';
import { Space, App, Dropdown, Button, Popconfirm, Tabs } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { listRequest } from './api';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { columns } from './columns';
import FormModal from './form-modal';

const Page: React.FC = () => {
    const actionRef = useRef<ActionType>(null);
    const { modal, message } = App.useApp();
    // 编辑行数据的state
    const [editRow, setEditRow] = useState(null);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit' | 'view'>('add');
    const [otherParams, setOtherParams] = useState({ reviewStatus: 'pending' });

    const router = useRouter();

    const request = async (params: { current: number; pageSize: number }) => {
        const { current, pageSize } = params;

        const data = {
            ...params,
        };

        const res = await listRequest(data);

        if (res?.code === 0) {
            return {
                data: res?.data.list || [],
                success: true,
                total: res?.data?.count || 0,
            };
        }

        return {
            data: [],
            success: false,
            total: 0,
        };
    };

    const handleEdit = (record: any) => {
        setMode('edit');
        //  这里可以做一些record数据的格式化
        setEditRow({ ...record });
        setOpen(true);
    };

    const handleView = (record: any) => {
        setMode('view');
        //  这里可以做一些record数据的格式化
        setEditRow({ ...record });
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setOpen(false);
        actionRef.current?.reload();
    };

    const handleDelete = (record: any) => {};

    const finalColumns = columns.concat([
        {
            title: '操作',
            key: 'action',
            width: 180,
            hideInSearch: true,
            fixed: 'right',
            render: (_: any, record: any) => {
                const actionMap = {
                    edit: handleEdit,
                    delete: handleDelete,
                    view: handleView,
                };
                const case1 = [
                    {
                        key: 'edit',
                        label: '编辑',
                    },
                    {
                        key: 'delete',
                        label: '删除',
                    },
                    {
                        key: 'copy',
                        label: '复制',
                    },
                    {
                        key: 'view',
                        label: '查看',
                    },
                ];
                const case2 = [
                    {
                        key: 'copy',
                        label: '复制',
                    },
                    {
                        key: 'view',
                        label: '查看',
                    },
                ];
                const case3 = [
                    {
                        key: 'edit',
                        label: '编辑',
                    },
                    {
                        key: 'copy',
                        label: '复制',
                    },
                    {
                        key: 'view',
                        label: '查看',
                    },
                ];

                return (
                    <>
                        {case1.slice(0, 3).map((item) => {
                            return (
                                <Button
                                    key={item.key}
                                    size="small"
                                    type="link"
                                    onClick={() => actionMap[item.key as keyof typeof actionMap](record)}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                        {/* 多于三个操作放到下拉菜单 */}
                        {case1.length > 3 && (
                            <Dropdown
                                menu={{
                                    items: case1.slice(3),
                                    onClick: (item) => actionMap[item.key as keyof typeof actionMap](record),
                                }}
                                placement="bottomRight"
                            >
                                <Button size="small" type="link" icon={<EllipsisOutlined />} />
                            </Dropdown>
                        )}
                    </>
                );
            },
        },
    ]);

    // Tab切换时刷新数据
    const handleTabChange = (key: string) => {
        setOtherParams({ reviewStatus: key });
    };

    // 表格的title处若有tab切换重新请求接口则添加Tab配置
    const tabItems = [
        {
            key: 'pending',
            label: '待审核',
        },
        {
            key: 'approved',
            label: '已审核',
        },
        {
            key: 'all',
            label: '全部',
        },
    ];

    return (
        <div>
            <ProTable
                columns={finalColumns}
                actionRef={actionRef}
                request={request}
                form={{ span: 6 }}
                // 表格的title处若有tab切换重新请求接口则添加此行
                headerTitle={
                    <Tabs
                        activeKey={otherParams.reviewStatus}
                        onChange={handleTabChange}
                        items={tabItems}
                        size="small"
                    />
                }
                params={otherParams}
                rowKey="id"
                scroll={{ x: 'max-content' }}
                toolBarRender={() => [
                    <Button
                        key="add"
                        type="primary"
                        onClick={() => {
                            setMode('add');
                            setOpen(true);
                        }}
                    >
                        <PlusOutlined />
                        新增
                    </Button>,
                ]}
                tableAlertRender={false}
                tableAlertOptionRender={false}
            />
            <FormModal
                open={open}
                width={1300}
                onCancel={handleCancel}
                onOk={handleOk}
                destroyOnHidden
                maskClosable={false}
                mode={mode}
                okButtonProps={{
                    disabled: mode === 'view',
                }}
                contentProps={{ initialValues: editRow }}
                styles={{
                    body: {
                        height: '500px',
                        overflow: 'auto',
                    },
                }}
            />
        </div>
    );
};

export default Page;
