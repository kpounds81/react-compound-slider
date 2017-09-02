// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider, { Knobs, Links, Ticks } from 'react-electric-slide'
import ValueViewer from '../ValueViewer'

// *******************************************************
// RAIL COMPONENT
// *******************************************************
function Rail() {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '4px',
        borderRadius: '2px',
        backgroundColor: 'rgb(155,155,155)',
      }}
    />
  )
}

// *******************************************************
// LINK COMPONENT
// *******************************************************
function Link({ source, target, scale }) {
  if (!source || !target) {
    return null
  }

  const p0 = scale(source.val)
  const p1 = scale(target.val)

  return (
    <div
      style={{
        position: 'absolute',
        top: '-1px',
        height: '8px',
        zIndex: 1,
        backgroundColor: '#455a64',
        borderRadius: '6px',
        left: `${p0}%`,
        width: `${p1 - p0}%`,
      }}
    />
  )
}

Link.propTypes = {
  source: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  target: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  scale: PropTypes.func,
}

// *******************************************************
// KNOB COMPONENT
// *******************************************************
class Knob extends Component {
  onMouseDown = e => {
    const { handleMouseDown, knob: { key } } = this.props
    handleMouseDown(e, key)
  }

  onTouchStart = e => {
    const { handleTouchStart, knob: { key } } = this.props
    handleTouchStart(e, key)
  }

  render() {
    const { knob: { val }, index, scale } = this.props
    const domain = scale.domain()

    return (
      <div
        role="slider"
        tabIndex={index}
        aria-valuemin={domain[0]}
        aria-valuemax={domain[1]}
        aria-valuenow={val}
        style={{
          left: `${scale(val)}%`,
          position: 'absolute',
          marginLeft: '-12px',
          marginTop: '-10px',
          zIndex: 2,
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          borderRadius: '50%',
          border: 'solid 4px rgb(200,200,200)',
          backgroundColor: '#455a64',
        }}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
      />
    )
  }
}

Knob.propTypes = {
  knob: PropTypes.shape({
    key: PropTypes.string,
    val: PropTypes.number,
  }),
  scale: PropTypes.func,
  index: PropTypes.number,
  handleMouseDown: PropTypes.func,
  handleTouchStart: PropTypes.func,
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
function Tick({ value, scale, count }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: '14px',
          marginLeft: '-0.5px',
          width: '1px',
          height: '5px',
          backgroundColor: 'rgb(200,200,200)',
          left: `${scale(value)}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: '22px',
          fontSize: '10px',
          textAlign: 'center',
          color: 'white',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${scale(value)}%`,
        }}
      >
        {value}
      </div>
    </div>
  )
}

Tick.propTypes = {
  value: PropTypes.number,
  scale: PropTypes.func,
  count: PropTypes.number,
}

// *******************************************************
// SLIDER EXAMPLE
// *******************************************************
const defaultValues = [
  { key: 'cat', val: 450 },
  { key: 'hat', val: 400 },
  { key: 'dog', val: 300 },
  { key: 'bat', val: 150 },
]

class Example extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  render() {
    const { state: { values, update } } = this

    return (
      <div style={{ height: 120, width: '100%' }}>
        <ValueViewer values={values} update={update} />
        <Slider
          reversed
          rootStyle={{
            position: 'relative',
            width: '100%',
          }}
          mode={2}
          step={5}
          domain={[100, 500]}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          defaultValues={values}
        >
          <Rail />
          <Knobs>
            {({ knobs, scale, handleMouseDown, handleTouchStart }) => {
              return (
                <div className="slider-knobs">
                  {knobs.map((knob, index) => {
                    return (
                      <Knob
                        key={knob.key}
                        knob={knob}
                        index={index}
                        scale={scale}
                        handleMouseDown={handleMouseDown}
                        handleTouchStart={handleTouchStart}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Knobs>
          <Links>
            {({ links, scale }) => {
              return (
                <div className="slider-links">
                  {links.map((link, index) => {
                    return (
                      <Link
                        key={link.key}
                        source={link.source}
                        target={link.target}
                        index={index}
                        scale={scale}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Links>
          <Ticks>
            {({ scale }) => {
              const ticks = scale.ticks(20)

              return (
                <div className="slider-links">
                  {ticks.map(value => {
                    return (
                      <Tick
                        key={`tick-${value}`}
                        value={value}
                        scale={scale}
                        count={ticks.length}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default Example
