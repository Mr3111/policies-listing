import React from 'react';
import { Select, Space } from 'antd';
import { camelCaseToTitleCase } from '../../utils';
import styled from 'styled-components';

export interface ProductFilterProps {
    filters: {
        title?: string;
        key: string;
        options?: {
            value: string;
            label: string;
        }[];
    }[];
    onFilterClick?: (key: string, value: string) => void;
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
    const { Option } = Select;
    return (
        <Space>
            {filters.map(({ key, title, options }) => {
                return (
                    <Select
                        showSearch={!!options}
                        onChange={(value) =>
                            onFilterClick && onFilterClick(key, value)
                        }
                        style={{ width: 200 }}
                        placeholder={`${options ? 'Search to' : ''} Select ${
                            title || camelCaseToTitleCase(key.toString())
                        }`}
                        optionFilterProp="children"
                    >
                        {options?.map(({ value, label }) => (
                            <Option value={value}>{label}</Option>
                        ))}
                    </Select>
                );
            })}
        </Space>
    );
};
