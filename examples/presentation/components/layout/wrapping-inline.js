import styled from '@emotion/styled';

const WrappingInline = styled.div(({ theme, space = 1, align = 'left' }) => ({
  margin: (-theme.layoutMargin * space) / 2,
  textAlign: align,
  '& > *': {
    display: 'inline-block',
    margin: (theme.layoutMargin * space) / 2,
  },
}));

export { WrappingInline as default };
