import React from 'react';

export default function Spinner(props) {
  const imageLoading = props.properties.loadingImage;
  const styleClass = {
    backgroundImage: imageLoading ? `url('${imageLoading}')` : '',
  };

  const boxImageLoading = <div className="loader" style={styleClass} />;

  return (
    <div className="imgLoader">
      {boxImageLoading}
    </div>
  );
}

Spinner.propTypes = {
  properties: React.PropTypes.shape({
    loadingImage: React.PropTypes.string,
  }),
};

Spinner.defaultProps = {
  properties: {},
};
