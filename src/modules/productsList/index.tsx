import React, { Key } from 'react';
import { Space } from 'antd';
import { ProductCard, ProductCardProps } from '@components/card';
import { IProductId } from '@modules/productComparator';

export interface ProductListProps {
    products: ProductCardProps[];
    onAddToCompare: (key: Key, value: boolean) => void;
    selectedProductId?: IProductId;
    onSelect?: (id: IProductId) => void;
}
export const ProductList: React.FC<ProductListProps> = ({
    products,
    onAddToCompare,
    selectedProductId,
    onSelect,
}) => {
    return (
        <Space direction="vertical" align="center">
            {products.map((productDetails) => (
                <ProductCard
                    key={productDetails.id}
                    {...productDetails}
                    onAddToCompare={onAddToCompare}
                    isSelected={productDetails.id === selectedProductId}
                    onSelect={onSelect}
                />
            ))}
        </Space>
    );
};
