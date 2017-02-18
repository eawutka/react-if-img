'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IfImg = function (_Component) {
  _inherits(IfImg, _Component);

  function IfImg(props) {
    _classCallCheck(this, IfImg);

    var _this = _possibleConstructorReturn(this, (IfImg.__proto__ || Object.getPrototypeOf(IfImg)).call(this));

    _this.state = {
      existence: undefined
    };
    _this.checkExistence(props);
    return _this;
  }

  _createClass(IfImg, [{
    key: 'render',
    value: function render() {
      // eslint-disable-next-line
      var _props = this.props,
          alt = _props.alt,
          altProps = _props.altProps,
          children = _props.children,
          loading = _props.loading,
          onResolve = _props.onResolve,
          rest = _objectWithoutProperties(_props, ['alt', 'altProps', 'children', 'loading', 'onResolve']);

      return _react2.default.createElement(
        'span',
        { className: 'IfImg' },
        this.state.existence === undefined ? loading && loading : this.state.existence ? _react2.default.createElement('img', _extends({ alt: alt }, rest)) : _react2.default.createElement(
          'span',
          altProps,
          children ? children : alt
        )
      );
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        this.setState({ existence: undefined });
        this.checkExistence(nextProps);
      }
    }
  }, {
    key: 'checkExistence',
    value: function checkExistence(props) {
      var _this2 = this;

      new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
          resolve(true);
        };
        img.onerror = function () {
          resolve(false);
        };
        img.src = props.src;
      }).then(function (existence) {
        if (_this2.props.onResolve) {
          _this2.props.onResolve(existence);
        }
        _this2.setState({ existence: existence });
      });
    }
  }]);

  return IfImg;
}(_react.Component);

IfImg.propTypes = {
  src: _react.PropTypes.string.isRequired,
  alt: _react.PropTypes.string.isRequired,
  altProps: _react.PropTypes.object,
  children: _react.PropTypes.element,
  onResolve: _react.PropTypes.func
};

exports.default = IfImg;