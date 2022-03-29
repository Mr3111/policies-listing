import React, { Key } from 'react';
import styled from 'styled-components';
import { Button } from '@components/button';
import { Checkbox, Divider, Space, Tooltip } from 'antd';
import { CheckOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { IProductId } from '@modules/productComparator';

export interface ProductCardProps {
    id: IProductId;
    title: string;
    features: { title: string; description: string; values: string[] }[];
    cost: { title: string; description: string; values: string[] };
    avatar: string;
    highlights: string[];
    onAddToCompare?: (key: Key, value: boolean) => void;
    onSelect?: (id: IProductId) => void;
    isSelected?: boolean;
    isExternal?: boolean;
}

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 1100px;
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 10px;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    width: 100%;
    height: 100%;
    padding: 20px;

    img {
        //width: 100%;
        max-height: 100px;
        object-fit: cover;
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #f8f8f8;
    border-top: 1px solid #e6e6e6;
`;

type FeatureProps = {
    title: string;
    description: string;
    values: string[];
};

function Feature({ title, description, values }: FeatureProps) {
    return (
        <div>
            <h4>
                {title}&nbsp;
                <Tooltip title={description} trigger="click">
                    <Button
                        type="text"
                        size={'small'}
                        shape="circle"
                        icon={<InfoCircleOutlined />}
                    />
                </Tooltip>
            </h4>
            {values?.map((value) => (
                <Title style={{ marginTop: 0 }} level={5} key={value}>
                    {value}
                </Title>
            ))}
        </div>
    );
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    cost,
    features,
    title,
    avatar,
    isSelected,
    onSelect,
    isExternal,
    highlights,
    onAddToCompare,
}) => {
    return (
        <CardContainer>
            <Content>
                <Space align="start" size={20}>
                    <img src={avatar} alt={title} />
                    <div>
                        <h2>{title}</h2>
                        <Button type="dashed" disabled={isExternal}>
                            View Features
                        </Button>
                    </div>
                </Space>
                <Space align="start">
                    <Divider type="vertical" />
                    <Space align="start" size={14}>
                        {features?.map((feature) => (
                            <Feature key={feature.title} {...feature} />
                        ))}
                    </Space>
                    <Divider type="vertical" />
                    <Feature
                        title={cost.title}
                        description={cost.description}
                        values={cost.values}
                    />
                </Space>
            </Content>
            <Footer>
                <Space align="start">
                    {highlights?.map((highlight) => (
                        <>
                            <CheckOutlined />
                            {highlight}
                        </>
                    ))}
                </Space>
                <Space>
                    <Checkbox
                        onChange={(e) =>
                            onAddToCompare &&
                            onAddToCompare(id, e.target.checked)
                        }
                    >
                        Add to compare
                    </Checkbox>
                    {isSelected ? (
                        <Button type="primary">Selected</Button>
                    ) : (
                        <Button
                            type="primary"
                            ghost
                            disabled={isExternal}
                            onClick={() => onSelect && onSelect(id)}
                        >
                            Select Product
                        </Button>
                    )}
                    {/*<Button type="primary">Select Product</Button>*/}
                </Space>
            </Footer>
        </CardContainer>
    );
};
