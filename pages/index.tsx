import React, { useState } from 'react';

import { Main, Cards, Footer, Modal, Button } from '@components';
import productsData from '@public/products.json';
import {
    IMetadata,
    IProduct,
    IProductId,
    ProductComparator,
} from '../src/modules/productComparator';
import { Layout, Space, Tooltip } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Text from 'antd/lib/typography/Text';
import { Key } from 'antd/lib/table/interface';

const ActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
    align-items: center;
    margin: 20px 40px 0 20px;
`;

const Home: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>(productsData);
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
    const { Header, Content } = Layout;
    return (
        <Layout>
            {/*    style={{*/}
            {/*        display: 'flex',*/}
            {/*        flexDirection: 'column',*/}
            {/*        minHeight: '100vh',*/}
            {/*    }}*/}
            {/*>*/}
            {/*<Header />*/}
            {/*<Header>*/}
            <Main products={productsData} />
            {/*</Header>*/}
            {/*<Content>*/}
            <ActionBar>
                <Text
                    type={selectedProductKeys.length > 1 ? 'success' : 'danger'}
                >
                    {selectedProductKeys.length > 1
                        ? `Click on Compare to compare the ${selectedProductKeys.length} selected policies`
                        : 'Please select at least 2 policies using checkbox to compare'}
                </Text>
                <Space>
                    <Modal
                        buttonText="Compare"
                        title="Comparison View"
                        width={350 + 200 * products.length}
                        okButtonProps={{ disabled: !selectedProductId }}
                        isButtonDisabled={selectedProductKeys.length < 2}
                        centered
                    >
                        <ProductComparator
                            products={products.filter(({ key }) =>
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
            <Cards
                products={products}
                selectedProductId={selectedProductId}
                selectedRowKeys={selectedProductKeys}
                onSelectChange={setSelectedProductKeys}
            />
            {/*</Content>*/}
            <Footer />
        </Layout>
    );
};

export default Home;
