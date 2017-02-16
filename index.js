import React, { Component, PropTypes } from 'react'

class IfImg extends Component {
  constructor(props) {
    super()
    this.state = {
      existence: undefined
    }
    this.checkExistence(props)
  }
  render() {
    let { alt, altProps, children, ...rest } = this.props
    return (
      <span className='IfImg'>
        {this.state.existence !== 'undefined' && 
          this.state.existence ?
            (
              <img alt={alt} {...rest} />
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
    new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => { resolve(true) }
      img.onerror = () => { resolve(false) }
      img.src = props.src
    }).then((existence) => {
      this.setState({existence: existence})
    })
  }
}

IfImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  altProps: PropTypes.object,
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element])
}

export default IfImg