import React from 'react';
import ReactDOMServer from 'react-dom/server';

const childToWeb = (child: JSX.Element) => {
  const { type, props } = child;
  const name = type && type.displayName;
  const webName = name && name[0].toLowerCase() + name.slice(1);
  const Tag = webName ? webName : type;
  return <Tag {...props}>{toWeb(props.children)}</Tag>;
};

const toWeb = (children: JSX.Element[] | JSX.Element) =>
  React.Children.map(children, childToWeb);

export const serialiseSVG = (element: JSX.Element): string => {
  return ReactDOMServer.renderToStaticMarkup(<>{toWeb(element)}</>);
};

export const addHTML = (content: string): string => `<!doctype html>
<html lang="en">
  <head>
    <title>Flagitect</title>
  </head>
  <body>
    ${content}
  </body>
</html>`;
