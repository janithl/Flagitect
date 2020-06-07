import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Dimensions, StyleSheet, View } from 'react-native';
import { G, Svg, Rect } from 'react-native-svg';

import { Footer, Header } from '@components';
import colours from '@res/colours';

const margin = 20;
const width = Math.round(Dimensions.get('window').width - margin * 2);
const propotions = 2 / 3;
const height = Math.round(propotions * width);

const renderHorizontalDivisions = (divColours: string[]) => {
  const divHeight = height / divColours.length;
  return (
    <G>
      {divColours.map((colour: string, i: number) => (
        <Rect
          x="0"
          y={i * divHeight}
          height={divHeight}
          width={width}
          fill={colour}
          key={i}
        />
      ))}
    </G>
  );
};

const renderFlag = () => (
  <Svg
    height={propotions * width}
    width={width}
    style={{ backgroundColor: '#33AAFF' }}>
    {renderHorizontalDivisions([colours.black, colours.salmon, colours.beige])}
  </Svg>
);

const childToWeb = (child: JSX.Element) => {
  const { type, props } = child;
  const name = type && type.displayName;
  const webName = name && name[0].toLowerCase() + name.slice(1);
  const Tag = webName ? webName : type;
  return <Tag {...props}>{toWeb(props.children)}</Tag>;
};

const toWeb = (children: JSX.Element[] | JSX.Element) =>
  React.Children.map(children, childToWeb);

const serialize = () => {
  const element = renderFlag();
  const svgString = ReactDOMServer.renderToStaticMarkup(toWeb(element));
  console.log(svgString);
};

export default (): JSX.Element => (
  <View style={styles.container}>
    <Header title={'Flagitect'} onShare={serialize} />
    <View style={styles.editor}>{renderFlag()}</View>
    <Footer />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    margin: 10,
    alignItems: 'center',
  },
  slider: {
    width: 150,
    height: 50,
  },
  editor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
