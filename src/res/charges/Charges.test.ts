import renderCharges, { ComplexTypes, SimpleTypes } from './index';
import { StripedTypes } from './Stripes';

describe('Charges', () => {
  it('renders Diamond correctly', () => {
    expect(
      renderCharges(
        [
          {
            id: 'diamond-1',
            type: SimpleTypes.Diamond,
            colour: '#c00',
            percentage: 50,
          },
        ],
        400,
        600,
      ),
    ).toMatchSnapshot();
  });

  it('renders Pall correctly', () => {
    expect(
      renderCharges(
        [
          {
            id: 'pall-1',
            type: ComplexTypes.Pall,
            colour: '#0c0',
            thickness: 25,
          },
        ],
        400,
        600,
      ),
    ).toMatchSnapshot();
  });

  it('renders Star correctly', () => {
    expect(
      renderCharges(
        [
          {
            id: 'star-5',
            type: ComplexTypes.Star,
            colour: '#0c0',
            thickness: 40,
            percentage: 50,
            points: 5,
            rotation: 90,
          },
        ],
        400,
        600,
      ),
    ).toMatchSnapshot();

    expect(
      renderCharges(
        [
          {
            id: 'star-8',
            type: ComplexTypes.Star,
            colour: '#0c0',
            thickness: 60,
            percentage: 50,
            points: 8,
            rotation: 0,
          },
        ],
        400,
        600,
      ),
    ).toMatchSnapshot();
  });

  it('renders Stripes correctly', () => {
    expect(
      renderCharges(
        [
          {
            id: 'stripes-serrated',
            type: StripedTypes.Serrated,
            colour: '#00c',
            thickness: 25,
          },
        ],
        400,
        600,
      ),
    ).toMatchSnapshot();

    expect(
      renderCharges(
        [
          {
            id: 'stripes-wavy',
            type: StripedTypes.Wavy,
            colour: '#c00',
            thickness: 25,
          },
        ],
        400,
        600,
      ),
    ).toMatchSnapshot();
  });
});
