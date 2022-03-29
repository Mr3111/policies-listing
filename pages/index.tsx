import React, { useState } from 'react';

import { Main, Table, Footer, Modal, Button } from '@components';
import productsData from '@public/products.json';
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
import { ProductList, ProductListProps } from '@modules/productsList';
import { ProductCardProps } from '@components/card';
import { ProductFilter } from '@modules/productFilter';

const ActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
    align-items: center;
    margin: 20px 40px 0 20px;
`;

const productsListData: ProductCardProps[] = [];
for (let i = 1; i < 5; i++) {
    productsListData.push({
        id: i.toString(),
        title: 'Complete Health Solution Gold',
        features: [
            {
                title: 'Sum Insured',
                description:
                    'lore ipsum dolor sit amet, consectetur adipiscing elit.',
                values: ['₹ 10 L'],
            },
            {
                title: 'Claim Settled',
                description:
                    'lore ipsum dolor sit amet, consectetur adipiscing elit.',
                values: ['98%'],
            },
            {
                title: 'OPD',
                description:
                    'lore ipsum dolor sit amet, consectetur adipiscing elit.',
                values: ['₹ 2500'],
            },
            {
                title: 'Lab',
                description:
                    'lore ipsum dolor sit amet, consectetur adipiscing elit.',
                values: ['₹ 5000'],
            },
        ],
        cost: {
            title: 'MRP',
            description:
                'lore ipsum dolor sit amet, consectetur adipiscing elit.',
            values: ['₹ 1,356/ montly', '₹ 16,000/ yearly'],
        },
        avatar: 'https://source.unsplash.com/random/480x480',
        highlights: ['Free in clinic', 'Free in hospital', 'Free in pharmacy'],
    });
}

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
                        <ProductFilter filters={[{ key: 'sumInsured' }]} />
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
