import React from 'react';
import { Footer as BaseFooter } from 'antd/lib/layout/layout';

export const Footer: React.FC = () => {
    return (
        <BaseFooter
            style={{
                textAlign: 'center',
            }}
        >
            Page Design ©2022 Created by Rishab Mishra
        </BaseFooter>
    );
};
