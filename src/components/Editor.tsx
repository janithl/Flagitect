import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Footer, Header, NumberSpinner, Row, Spinner, Text } from '@components';
import {
  Checked,
  Diagonal,
  Divisions,
  Horizontal,
  PerSaltire,
  Solid,
  Vertical,
} from '@res/layouts';

const Element = ({ division, ...props }: ElementProps): JSX.Element => {
  switch (division) {
    case 'horizontal':
      return <Horizontal size={256} {...props} />;
    case 'vertical':
      return <Vertical size={256} {...props} />;
    case 'diagonal':
      return <Diagonal size={256} toLeft={false} {...props} />;
    case 'diagonal_to_left':
      return <Diagonal size={256} {...props} />;
    case 'per_saltire':
      return <PerSaltire size={256} {...props} />;
    case 'checked':
      return <Checked size={256} {...props} />;
  }

  return <Solid size={256} {...props} />;
};

type ElementProps = {
  division: string;
};

export default (): JSX.Element => {
  const [height, setHeight] = useState(2);
  const [width, setWidth] = useState(3);
  const [division, setDivision] = useState(0);

  return (
    <View style={styles.container}>
      <Header title={'Flag Editor'} />
      <Element
        division={Object.keys(Divisions)[division]}
        ratio={height / width}
      />
      <Text H2>{`${height} : ${width}`}</Text>
      <Row height={30}>
        <Text H3>Height</Text>
        <NumberSpinner
          value={height}
          setValue={(value: number) => setHeight(value)}
          min={1}
          max={100}
        />
      </Row>
      <Row height={30}>
        <Text H3>Width</Text>
        <NumberSpinner
          value={width}
          setValue={(value: number) => setWidth(value)}
          min={1}
          max={100}
        />
      </Row>
      <Row height={30}>
        <Text H3>Division</Text>
        <Spinner
          value={division}
          setValue={(value: number) => setDivision(value)}
          list={Object.values(Divisions).map((d) => d.name)}
        />
      </Row>
      <Footer />
    </View>
  );
};

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
});
