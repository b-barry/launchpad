/* @flow */

import React, { Component } from 'react';
import type { Children } from 'react';
import { Link } from 'react-router-dom';
import './HeaderButton.less';

export default class HeaderButton extends Component {
  props: {|
    onClick?: (e: Event) => any,
    disabled?: boolean,
    active?: boolean,
    tooltip?: Children,
    children?: Children,
    to?: string,
  |};

  state = ({
    isHovered: false,
  }: {|
    isHovered: boolean,
  |});

  handleMouseOver = () => {
    this.setState({
      isHovered: true,
    });
  };

  handleMouseOut = () => {
    this.setState({
      isHovered: false,
    });
  };

  defaultProps = {
    disabled: false,
  };

  renderTooltip() {
    if (this.props.tooltip) {
      let tooltipClassName = 'HeaderButton-Tooltip';
      if (this.state.isHovered) {
        tooltipClassName += ' HeaderButton-Tooltip--show';
      }
      return <div className={tooltipClassName}>{this.props.tooltip}</div>;
    } else {
      return null;
    }
  }

  render() {
    let tooltipHandlers;
    if (this.props.tooltip) {
      tooltipHandlers = {
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut,
      };
    } else {
      tooltipHandlers = {};
    }

    let buttonClassName = 'HeaderButton';

    if (this.props.disabled) {
      buttonClassName += ' HeaderButton--disabled';
    }

    if (this.props.active) {
      buttonClassName += ' HeaderButton--active';
    }

    let Component;
    const componentProps = {};
    if (this.props.to) {
      Component = Link;
      componentProps.to = this.props.to;
    } else {
      Component = 'button';
      componentProps.onClick = this.props.onClick;
    }

    return (
      <Component className={buttonClassName} {...componentProps}>
        <div className="HeaderButton-Inner" {...tooltipHandlers}>
          {this.props.children}
        </div>
        {this.renderTooltip()}
      </Component>
    );
  }
}
