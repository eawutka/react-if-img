import React, { Component } from 'react'

const ImageExists = function(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

class IfImg extends Component {
  constructor(props) {
    super()
    this.state = {
      existence: undefined
    }
    this.checkExistence(props)
  }
  render() {
    let { src, alt, imgProps, altProps, children } = this.props
    return (
      <span className='IfImg'>
        {this.state.existence !== 'undefined' && 
          this.state.existence ?
            (
              <img alt={alt} src={src} {...imgProps} />
            ) : (
              <span {...altProps}>{children ? children : alt}</span>
            )
        }
      </span>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({existence: undefined})
      this.checkExistence(nextProps)
    }
  }
  checkExistence(props) {
    ImageExists(props.src, (existence) => {
      this.setState({existence: existence})
    })
  }
}

export default IfImg