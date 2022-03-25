import React, { useState } from 'react';

import { Button, Modal } from '@components';
import {
    IMetadata,
    ProductComparator,
    ProductComparatorProps,
} from '../../modules/productComparator';
import { Space, Tooltip } from 'antd';
import {
    RollbackOutlined,
    SearchOutlined,
    UndoOutlined,
} from '@ant-design/icons';

type MainProps = Pick<ProductComparatorProps, 'products'>;

export const Main: React.FC<MainProps> = ({ products }) => {
    return (
        <div
            style={{
                backgroundColor: '#282c34',
                color: '#fff',
                textAlign: 'center',
                paddingTop: 32,
                paddingBottom: 32,
            }}
        >
            <h1 style={{ color: '#fff', fontSize: 46 }}>Products comparator</h1>
        </div>
    );
};
