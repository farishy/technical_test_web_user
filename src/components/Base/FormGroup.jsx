import React from 'react';
import PropTypes from 'prop-types';
import { jsxs, jsx } from 'react/jsx-runtime';

function FormGroup({
  children,
  label,
  isRequired,
  placement,
  errorMessage,
  htmlFor,
  isError,
  showChildErrorSign,
  noErrorMessageDisableError,
  labelProps,
  secondaryMessage,
  ...props
}) {
  const renderChild = () => {
    if (showChildErrorSign && isError && /*#__PURE__*/React.isValidElement(children) && (noErrorMessageDisableError ? errorMessage : true)) {
      return /*#__PURE__*/React.cloneElement(children, {
        error: true
      });
    }

    return children;
  };

  return /*#__PURE__*/jsxs("div", { ...props,
    className: "d-flex  gap-50 " + (placement === "horizontal" ? "flex-row-reverse" : "flex-column") + " " + props.className || "",
    children: [/*#__PURE__*/jsxs("label", {
      htmlFor: htmlFor,
      ...labelProps,
      children: [label, label && isRequired && /*#__PURE__*/jsx("span", {
        className: "text-danger",
        children: " * "
      })]
    }), renderChild(), isError && placement !== "horizontal" && (noErrorMessageDisableError ? errorMessage : true) ? /*#__PURE__*/jsx("span", {
      className: "text-danger",
      children: errorMessage
    }) : /*#__PURE__*/jsx("span", {
      className: "text-textSecondary",
      children: secondaryMessage
    })]
  });
}

FormGroup.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isError: PropTypes.bool,
  showChildErrorSign: PropTypes.bool,
  placement: PropTypes.oneOf(["vertical", "horizontal"]),
  errorMessage: PropTypes.string,
  noErrorMessageDisableError: PropTypes.bool,
  htmlFor: PropTypes.string,
  secondaryMessage: PropTypes.string
};

export { FormGroup as default };
