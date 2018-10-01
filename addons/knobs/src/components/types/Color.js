import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

import ColorPicker from 'rc-color-picker';
import colorPickerCss from '!!raw-loader!rc-color-picker/assets/index.css';

import { Button } from '@storybook/components';

const StylelessButton = ({ style, ...props }) => <Button {...props} />;

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
};

const Swatch = styled.div({
  position: 'relative',
  top: 0,
  bottom: 0,
  right: 3,
  width: 28,
  transition: 'background 0.1s linear',
});

class ColorType extends React.Component {
  handleChange = ({ color, alpha }) => {
    const { onChange } = this.props;
    const rgba = hexToRgb(color).concat(alpha / 100);
    onChange(`rgba(${rgba.join(',')})`);
  };

  render() {
    const { knob } = this.props;
    const colorStyle = {
      background: knob.value,
    };

    return (
      <Fragment>
        <Global styles={css(colorPickerCss)} />
        <ColorPicker color={knob.value} onChange={this.handleChange}>
          <StylelessButton type="button" size="flex">
            {knob.value}
            <Swatch style={colorStyle} />
          </StylelessButton>
        </ColorPicker>
      </Fragment>
    );
  }
}

ColorType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  onChange: PropTypes.func,
};
ColorType.defaultProps = {
  knob: {},
  onChange: value => value,
};

ColorType.serialize = value => value;
ColorType.deserialize = value => value;

export default ColorType;
