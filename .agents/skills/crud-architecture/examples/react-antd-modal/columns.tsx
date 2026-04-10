import { getDict } from '@/services/commonApi';

export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 80,
        fixed: 'left',
        hideInSearch: true,
        render: (text: string, record: any, index: number) => {
            return index + 1;
        },
    },
    {
        title: '唯一识别码',
        dataIndex: 'id',
        key: 'id',
        width: 120,
        hideInSearch: true,
    },
    {
        title: '名称字段',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
    },
    {
        title: '枚举类型字段',
        dataIndex: 'enum1',
        key: 'enum1',
        width: 120,
        valueType: 'select',
        request: getDict('字典key'),
        hideInSearch: true,
    },
    {
        title: '开始时间',
        dataIndex: 'start_time',
        key: 'start_time',
        width: 160,
        valueType: 'dateTime',
        hideInSearch: true,
    },
    {
        title: '结束时间',
        dataIndex: 'end_time',
        key: 'end_time',
        width: 160,
        valueType: 'dateTime',
        hideInSearch: true,
    },
];
