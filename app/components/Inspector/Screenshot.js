import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';
import HighlighterRect from './HighlighterRect';
import { Spin } from 'antd';

export default class Screenshot extends Component {

  constructor (props) {
    super(props);
    this.state = {
      scaleRatio: 1
    };
    this.updateScaleRatio = debounce(this.updateScaleRatio.bind(this), 1000);
  }

  updateScaleRatio () {
    let screenshotEl = this.containerEl.querySelector('img');
    this.setState({
      scaleRatio: screenshotEl.naturalHeight / screenshotEl.offsetHeight
    });
  }

  componentDidMount () {
    this.updateScaleRatio();
    window.addEventListener('resize', this.updateScaleRatio);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateScaleRatio);
  }

  render () {
    const highlighterRects = [];
    const {source, screenshot, methodCallRequested} = this.props;
    const {scaleRatio} = this.state;

    let recursive = (node, zIndex = 0) => {
      if (!node) return;
      highlighterRects.push(<HighlighterRect {...this.props} node={node} zIndex={zIndex} scaleRatio={scaleRatio} key={node.path} />);
      node.children.forEach((childNode) => recursive(childNode, zIndex + 1));
    };

    recursive(source);
    return <Spin size='large' spinning={!!methodCallRequested}>
      <div ref={(containerEl) => this.containerEl = containerEl}>
        <img src={`data:image/gif;base64,${screenshot}`} />
        {highlighterRects}
      </div>
    </Spin>;
  }
}
