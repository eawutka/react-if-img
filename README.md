# react-if-img

A react component for rendering an image if it exists, and a placeholder if it doesn't.

### Install:
```jsx
npm install --save react-if-img
```

### Basic Usage:
You can use `IfImg` just like an `img` element.
This will gracefully render a `span` element containing the alt text if the image cannot be found.
```jsx
import IfImg from 'react-if-img'

<IfImg src={url} alt={altText} />
```

You can also pass in arbitrary props for the internal `img` element.
```jsx
<IfImg
  src={url}
  alt={altText}
  onClick={() => doStuff()}
  style={{margin: 10}}
  title={altText}/>
```

The `altProps` object will apply to the `span` containing the alt text in the case the image doesn't load.
```jsx
<IfImg
  src={url}
  alt={altText}
  altProps={{
    style: {
      fontSize: 25
    },
    onClick: () => doStuff(),
    className: "image-alt-text"
  }}
```

### Advanced Usage:

You can pass in children to render instead of the alt text if the image doesn't exist.
```jsx
<IfImg src={url} alt={altText}>
  <div className="image-not-found">
    <h1>Image not found.</h1>
  </div>
</IfImg>
```

By default, nothing will render until the image either loads or cannot be found, but with the optional `loading` prop you can show something in the meantime.
```jsx
<IfImg
  src={url}
  alt={altText}
  loading={<i className="fa fa-cog fa-spin"></i>}/>
```

An `onResolve` callback will be called with a boolean value of whether or not the image loaded.
```jsx
<IfImg
  src={url}
  alt={altText}
  onResolve={(imgExists) => {console.log(imgExists)}/>
```