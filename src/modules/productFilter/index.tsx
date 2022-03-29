import React from 'react';
import { Space } from 'antd';
import { ProductCard, ProductCardProps } from '@components/card';
import { camelCaseToTitleCase } from '../../utils';
import Text from 'antd/lib/typography/Text';
import Link from 'antd/lib/typography/Link';
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Button } from '@components';

export interface ProductFilterProps {
    filters: {
        title?: string;
        key: string;
    }[];
    onFilterClick?: (key: string) => void;
}

const Filter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: #e0e0e0;
    }
`;

export const ProductFilter: React.FC<ProductFilterProps> = ({
    filters,
    onFilterClick,
}) => {
    return (
        <Space>
            {filters.map(({ key, title }) => {
                return (
                    <Button>
                        <Space>
                            <Text type="secondary">
                                {title || camelCaseToTitleCase(key.toString())}:
                            </Text>
                            <Link>{key}</Link>
                            <CaretDownOutlined />
                        </Space>
                    </Button>
                );
            })}
        </Space>
    );
};
