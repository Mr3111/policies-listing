import React, { useMemo, useState } from 'react';

import { Footer, Modal, Button } from '@components';
import productsData from '@public/productsComparator.json';
import productsListData from '@public/products.json';
import {
    IMetadata,
    IProduct,
    IProductId,
    ProductComparator,
} from '@modules/productComparator';
import { Layout, Space, Tooltip } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Text from 'antd/lib/typography/Text';
import { Key } from 'antd/lib/table/interface';
import { ProductList } from '@modules/productsList';
import { ProductCardProps } from '@components/card';
import { ProductFilter } from '@modules/productFilter';

const ActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
    align-items: center;
    margin: 20px 40px 0 20px;
`;

const Home: React.FC = () => {
    const [comparatorProducts, setComparatorProducts] =
        useState<IProduct[]>(productsData);
    const [selectedProductId, setSelectedProductId] = useState<IProductId>();

    function reload() {
        setSelectedProductId(undefined);
    }

    const metadata: IMetadata = [
        {
            name: 'Pricing',
            fields: ['totalCost', 'annualRealizableBenefits'],
        },
        {
            name: 'Hostpitalization',
            fields: ['preventiveHealthCheckup'],
        },
        {
            name: 'Health Prime Benefits',
            fields: [
                'doctorConsultations',
                'labReimbursements',
                'networkDiscount',
                'teleConsultations',
            ],
        },
        {
            name: 'Insurance Benefits',
            fields: [
                'coPay',
                'ayushTreatment',
                'preHospitalization',
                'postHospitalization',
                'roomRent',
            ],
        },
    ];
    // const [tableMetadata, setTableMetadata] = useState<IMetadata>(metadata);
    const [selectedProductKeys, setSelectedProductKeys] = useState<Key[]>([]);
    const { Header, Content, Sider } = Layout;
    const handleAddToComparator = (key: Key, value: boolean) => {
        if (value) {
            setSelectedProductKeys([...selectedProductKeys, key]);
        } else {
            setSelectedProductKeys(
                selectedProductKeys.filter((k) => k !== key),
            );
        }
    };
    const handleFilterClick = (key: string, value: string) => {
        const newProducts = productsListData.filter((product) => {
            return product.features.some((feature) => {
                return feature.values.some((v) => v === value);
            });
        });
        setFilteredProducts(newProducts);
    };
    const filters = useMemo(() => {
        // return productsListData.reduce((acc, product) => {
        //     product.features.forEach((feature) => {
        //         feature.values.forEach((value) => {
        //             if (!acc.some((f) => f.value === value)) {
        //                 acc.push({
        //                     key: feature.title,
        //                     value,
        //                 });
        //             }
        //         });
        //     });
        //     return acc;
        // }, []);
    }, []);
    const [filteredProducts, setFilteredProducts] =
        useState<ProductCardProps[]>(productsListData);
    return (
        <Layout>
            <Header className="header">
                <h1 style={{ color: '#fff' }}>Products comparator</h1>
                <div className="logo" />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Space direction="vertical">
                    <ActionBar>
                        <ProductFilter
                            filters={[
                                { key: 'sumInsured' },
                                { key: 'maxAgeLimit' },
                            ]}
                            onFilterClick={handleFilterClick}
                        />
                    </ActionBar>
                    <ActionBar>
                        <Text
                            type={
                                selectedProductKeys.length > 1
                                    ? 'success'
                                    : 'danger'
                            }
                        >
                            {selectedProductKeys.length > 1
                                ? `Click on Compare to compare the ${selectedProductKeys.length} selected policies`
                                : 'Please select at least 2 policies using checkbox to compare'}
                        </Text>
                        <Space>
                            <Modal
                                buttonText="Compare"
                                title="Comparison View"
                                width={350 + 200 * comparatorProducts.length}
                                okButtonProps={{
                                    disabled: !selectedProductId,
                                }}
                                isButtonDisabled={
                                    selectedProductKeys.length < 2
                                }
                                centered
                            >
                                <ProductComparator
                                    products={comparatorProducts.filter(
                                        ({ key }) =>
                                            selectedProductKeys?.includes(key!),
                                    )}
                                    metadata={metadata}
                                    selectedProductId={selectedProductId}
                                    onProductSelect={setSelectedProductId}
                                />
                            </Modal>
                            <Tooltip title="Reload Data">
                                <Button
                                    shape="circle"
                                    icon={<UndoOutlined />}
                                    onClick={reload}
                                />
                            </Tooltip>
                        </Space>
                    </ActionBar>
                    {/*<Table*/}
                    {/*    products={comparatorProducts}*/}
                    {/*    selectedProductId={selectedProductId}*/}
                    {/*    selectedRowKeys={selectedProductKeys}*/}
                    {/*    onSelectChange={setSelectedProductKeys}*/}
                    {/*/>*/}
                    <ProductList
                        products={filteredProducts}
                        selectedProductId={selectedProductId}
                        onAddToCompare={handleAddToComparator}
                        onSelect={setSelectedProductId}
                    />
                </Space>
            </Content>
            <Footer />
        </Layout>
    );
};

export default Home;
