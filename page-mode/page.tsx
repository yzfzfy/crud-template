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

const Page: React.FC = () => {
    const actionRef = useRef<ActionType>(null);
    const { modal, message } = App.useApp();
    const [otherParams, setOtherParams] = useState({ reviewStatus: 'pending' });

    const request = async (params: { current: number; pageSize: number; reviewStatus: string }) => {
        // 这里可以拿到params参数，包括分页参数、其他自定义参数
        const { current, pageSize, reviewStatus } = params;

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
        // router.push(`/root/xxx/xxxx/formPage?mode=edit&id=${record.id}`);
    };

    const handleView = (record: any) => {
        // router.push(`/root/xxx/xxxx/formPage?mode=view&id=${record.id}`);
    };

    const handleDelete = (record: any) => {};

    // Tab切换时刷新数据
    const handleTabChange = (key: string) => {
        setOtherParams({ reviewStatus: key });
    };

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
                form={{ span: 6 }}
                request={request}
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
                    <Link key="add" href="/root/xxx/xxx/formPage?mode=add">
                        <Button key="add" type="primary">
                            <PlusOutlined />
                            新增
                        </Button>
                    </Link>,
                ]}
                tableAlertRender={false}
                tableAlertOptionRender={false}
            />
        </div>
    );
};

export default Page;
