import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => {
    return {
        container: {
            height: 'calc(100% + 40px)',
            width: 'calc(100% + 40px)',
            overflow: 'hidden',
            flexDirection: 'column',
            position: 'relative',
            margin: '-20px',
            padding: '20px',
        },
        pageTitle: {
            paddingLeft: '10px',
            paddingBottom: '5px',
            borderBottom: `1px solid ${token.colorBorder}`,
        },
        content: {
            width: '100%',
            height: 'calc(100% - 70px)',
            padding: '16px 0 0 0',
            overflowY: 'auto',
        },
        footer: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 100,
            height: '48px',
            padding: '8px 0',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            background: token.colorBgContainer,
        },
    };
});
