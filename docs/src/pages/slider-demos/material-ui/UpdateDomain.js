// @flow weak

import React, { Component } from 'react'
import Slider from 'react-compound-slider'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Rail, Handle, Track, Tick } from './components' // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const defaultValues = [250, 350]

class Example extends Component {
  state = {
    domain: [200, 500],
    values: defaultValues.slice(),
    update: defaultValues.slice(),
    reversed: false,
  }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  setDomain = domain => {
    this.setState({ domain })
  }

  toggleReverse = () => {
    this.setState(prev => ({ reversed: !prev.reversed }))
  }

  render() {
    const { state: { domain, values, update, reversed } } = this

    return (
      <div style={{ height: 150, width: '100%' }}>
        <button onClick={() => this.setDomain([100, 400])}>
          SET DOMAIN [100, 400]
        </button>
        <button onClick={() => this.setDomain([300, 600])}>
          SET DOMAIN [300, 600]
        </button>
        <button onClick={() => this.toggleReverse()}>
          {reversed ? 'DISPLAY LOW TO HIGH' : 'DISPLAY HIGH TO LOW'}
        </button>
        <ValueViewer values={values} update={update} />
        <Slider
          mode={1}
          step={10}
          domain={domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={update}
        >
          <Slider.Rail>
            {({ getRailProps }) => <Rail getRailProps={getRailProps} />}
          </Slider.Rail>
          <Slider.Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Slider.Handles>
          <Slider.Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Slider.Tracks>
          <Slider.Ticks count={10}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Slider.Ticks>
        </Slider>
      </div>
    )
  }
}

export default Example
