import React from 'react';
import { Table, Tag } from 'antd';
import {
    IProductId,
    ProductComparatorProps,
} from '../../modules/productComparator';
import { Button } from '@components/button';
import styled from 'styled-components';

export type IKeys = IProductId[];

type CardProps = Pick<ProductComparatorProps, 'products'> & {
    selectedRowKeys: IKeys;
    onSelectChange: (keys: IKeys) => void;
    selectedProductId?: IProductId;
};

const ProductListContainer = styled.div`
    height: 100%;
    padding: 20px;
`;

export const Cards: React.FC<CardProps> = ({
    products,
    selectedRowKeys,
    onSelectChange,
    selectedProductId,
}) => {
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Price/ year',
            dataIndex: 'totalCost',
            key: 'price',
        },
        {
            title: 'Doctor consultations',
            dataIndex: 'doctorConsultations',
            key: 'doctorConsultations',
        },
        {
            title: 'AYUSH Treatment',
            dataIndex: 'ayushTreatment',
            key: 'ayushTreatment',
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'isExternal',
            render: (isExternal: boolean) => (
                <Tag color={isExternal ? 'volcano' : 'green'}>
                    {isExternal ? 'External' : 'Internal'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <>
                    {selectedProductId === record.id ? (
                        <Button type="primary">Selected</Button>
                    ) : (
                        <Button disabled={record.isExternal}>
                            Select Product
                        </Button>
                    )}
                </>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <ProductListContainer>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={products}
            />
        </ProductListContainer>
    );
};
