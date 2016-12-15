import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Card } from 'antd';
import Screenshot from './Inspector/Screenshot';
import SelectedElement from './Inspector/SelectedElement';
import Source from './Inspector/Source';
import InspectorStyles from './Inspector.css';

export default class Inspector extends Component {

  componentWillMount () {
    this.props.applyClientMethod({methodName: 'source'});
    this.props.bindAppium();
  }

  render () {
    const {methodCallRequested, screenshot, selectedPath} = this.props;

    return <div className={InspectorStyles['inspector-container']}>
      <div className={InspectorStyles['screenshot-container']}>
          <div>
            {screenshot && <Screenshot {...this.props} />}
          </div>
      </div>
      <div className={InspectorStyles['source-tree-container']}>
        <Card loading={!!methodCallRequested} title='Source' className={InspectorStyles['source-tree-card']}>
          <Source {...this.props} />
          {selectedPath && <SelectedElement {...this.props}/>}
        </Card>
      </div>
    </div>;
  }
}
