import React, { useMemo } from 'react';
import { Table as BaseTable, Tag } from 'antd';
import { IProductId, ProductComparatorProps } from '@modules/productComparator';
import { Button } from '@components/button';
import styled from 'styled-components';
import { Key } from 'antd/lib/table/interface';

type CardProps = Pick<ProductComparatorProps, 'products'> & {
    selectedRowKeys: Key[];
    onSelectChange: (keys: Key[]) => void;
    selectedProductId?: IProductId;
};

const ProductListContainer = styled.div`
    height: 100%;
    padding: 20px;
`;

export const Table: React.FC<CardProps> = ({
    products,
    selectedRowKeys,
    onSelectChange,
    selectedProductId,
}) => {
    const columns = useMemo(
        () => [
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
        ],
        [],
    );

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <ProductListContainer>
            <BaseTable
                rowSelection={rowSelection}
                columns={columns}
                dataSource={products}
            />
        </ProductListContainer>
    );
};
