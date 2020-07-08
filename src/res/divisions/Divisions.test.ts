import renderDivisions, { Division } from './index';

describe('Divisions', () => {
  it('renders Solid correctly', () => {
    expect(
      renderDivisions(Division.Solid, ['#c00'], 400, 600),
    ).toMatchSnapshot();
  });

  it('renders Horizontal correctly', () => {
    expect(
      renderDivisions(Division.Horizontal, ['#c00', '#00c', '#ccc'], 300, 500),
    ).toMatchSnapshot();

    expect(
      renderDivisions(
        Division.Horizontal,
        ['#c00', '#00c', '#ccc', '#00c', '#c00'],
        150,
        300,
      ),
    ).toMatchSnapshot();
  });

  it('renders Vertical correctly', () => {
    expect(
      renderDivisions(Division.Vertical, ['#c00', '#00c', '#ccc'], 400, 600),
    ).toMatchSnapshot();

    expect(
      renderDivisions(
        Division.Vertical,
        ['#c00', '#00c', '#ccc', '#00c', '#c00'],
        300,
        500,
      ),
    ).toMatchSnapshot();
  });

  it('renders Quartered correctly', () => {
    expect(
      renderDivisions(Division.Quartered, ['#c00', '#00c'], 400, 600),
    ).toMatchSnapshot();
  });

  it('renders Diagonal correctly', () => {
    expect(
      renderDivisions(Division.Diagonal, ['#c00', '#00c'], 400, 600),
    ).toMatchSnapshot();
  });

  it('renders DiagonalToLeft correctly', () => {
    expect(
      renderDivisions(Division.DiagonalToLeft, ['#c00', '#00c'], 400, 600),
    ).toMatchSnapshot();
  });

  it('renders PerSaltire correctly', () => {
    expect(
      renderDivisions(Division.PerSaltire, ['#c00', '#00c'], 400, 600),
    ).toMatchSnapshot();

    expect(
      renderDivisions(
        Division.PerSaltire,
        ['#c00', '#00c', '#ccc', '#0c0'],
        400,
        600,
      ),
    ).toMatchSnapshot();
  });

  it('renders Gyronny correctly', () => {
    expect(
      renderDivisions(Division.Gyronny, ['#c00', '#00c'], 400, 600),
    ).toMatchSnapshot();
  });

  it('renders Checked correctly', () => {
    expect(
      renderDivisions(Division.Checked, ['#c00', '#00c'], 400, 600, 6, 8),
    ).toMatchSnapshot();

    expect(
      renderDivisions(Division.Checked, ['#c00', '#00c'], 300, 500, 5, 3),
    ).toMatchSnapshot();
  });
});
