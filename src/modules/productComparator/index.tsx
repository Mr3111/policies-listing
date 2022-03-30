import React from 'react';
import styled from 'styled-components';
import { Button } from '@components';
import { Space, Typography } from 'antd';
import { CloseOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { camelCaseToTitleCase } from '../../utils';

export type IProductId = string;

export type IProductComparator = Partial<{
    key: IProductId;
    id: IProductId;
    isExternal: boolean;
    name: string;
    totalCost: number;
    annualRealizableBenefits: string;
    doctorConsultations: string;
    labReimbursements: string;
    networkDiscount: string;
    teleConsultations: string;
    coPay: string;
    ayushTreatment: string;
    preHospitalization: string;
    postHospitalization: string;
    roomRent: string;
    preventiveHealthCheckup: string;
    image: string;
}>;

type Row = {
    name: string;
    fields: Array<keyof IProductComparator>;
};

export type IMetadata = Row[];

const ProductComparatorContainer = styled.div`
    table {
        width: 100%;
        margin-top: 20px;
    }

    table,
    th,
    td {
        padding: 4px;
        border: 1px solid #c7c6c6;
        border-collapse: collapse;
    }
`;

export type ProductComparatorProps = {
    products: IProductComparator[];
    metadata: IMetadata;
    selectedProductId?: IProductId;
    selectedKeys?: Array<IProductId>;
    onProductSelect: (productId?: IProductId) => void;
};

export const ProductComparator: React.FC<ProductComparatorProps> = ({
    products = [],
    metadata = [],
    selectedProductId,
    selectedKeys,
    onProductSelect,
}) => {
    const { Text } = Typography;

    return (
        <ProductComparatorContainer>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2} rowSpan={2}>
                            Plans
                        </th>
                        {products.map((product) => (
                            <th>{product.name}</th>
                        ))}
                    </tr>
                    <tr>
                        {/*<td colSpan={2} />*/}
                        {products.map(({ isExternal, id }) => (
                            <td
                                style={{
                                    padding: '1rem 1.2rem',
                                }}
                            >
                                <Space direction="vertical" align="center">
                                    {!isExternal &&
                                        (selectedProductId !== id ? (
                                            <Button
                                                type="primary"
                                                ghost
                                                disabled={isExternal}
                                                onClick={() =>
                                                    onProductSelect(id)
                                                }
                                            >
                                                Select Product
                                            </Button>
                                        ) : (
                                            <Button type="primary">
                                                Selected
                                            </Button>
                                        ))}
                                    {isExternal && (
                                        <Text type="danger">
                                            <InfoCircleTwoTone twoToneColor="#eb2f96" />{' '}
                                            &nbsp; External product
                                        </Text>
                                    )}
                                </Space>
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {metadata.map(({ name, fields }) => {
                        const categoryAggrRow = fields.map((field, index) => {
                            return (
                                <tr>
                                    {index === 0 && (
                                        <th rowSpan={fields.length}>{name}</th>
                                    )}
                                    <td>{camelCaseToTitleCase(field)}</td>
                                    {products.map((product) => (
                                        <td>
                                            {product[field] ? (
                                                <Text>{product[field]}</Text>
                                            ) : (
                                                <CloseOutlined
                                                    style={{
                                                        color: '#f10909',
                                                    }}
                                                />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            );
                        });
                        return categoryAggrRow;
                    })}
                </tbody>
            </table>
        </ProductComparatorContainer>
    );
};
