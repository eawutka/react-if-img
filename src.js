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
    // eslint-disable-next-line
    let { alt, altProps, children, loading, onResolve, ...rest } = this.props
    return (
      <span className='IfImg'>
        {this.state.existence === undefined ?
          (
            loading &&
            loading
          ) : (
          this.state.existence ?
            (
              <img alt={alt} {...rest} />
            ) : (
              <span {...altProps}>{children ? children : alt}</span>
            )
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
      if (this.props.onResolve) {
        this.props.onResolve(existence)
      }
      this.setState({existence: existence})
    })
  }
}

IfImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  altProps: PropTypes.object,
  children: PropTypes.element,
  onResolve: PropTypes.func
}

export default IfImg