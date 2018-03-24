import React from 'react';

import 'grommet/scss/vanilla/index.scss';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';

import CarListContainer from '../containers/CarListContainer';

import HeroImage from '../assets/img/35575049533_e12f1add0c_k.jpg';

/** */
export const CardListSortOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Availability', value: 'available' },
];

/**
 * @description
 * @export
 * @class Homepage
 */
export default class Homepage extends React.Component {
  /**
   * Creates an instance of Homepage.
   * @memberof Homepage
   */
  constructor() {
    super();

    /** */
    this.state = {
      year: new Date().getFullYear(),
    };
  }

  /**
   * @description
   * @returns
   * @memberof Homepage
   */
  render() {
    const { year } = this.state;
    return (
      <main data-component="Homepage">
        <Header>
          <Title>FancyCars.ca</Title>
        </Header>
        <Hero
          background={<Image src={HeroImage} fit="cover" full={true} />}
          backgroundColorIndex="dark"
        >
          <Box direction="row" justify="center" align="center">
            <Box basis="1/2" align="end" pad="medium" />
            <Box basis="1/2" align="start" pad="medium">
              <Card heading="We put the &quot;Fancy&quot; back in cars." />
            </Box>
          </Box>
        </Hero>

        <CarListContainer
          options={CardListSortOptions}
          defaultSortAttribute="name"
          defaultSortDirection="asc"
        />

        <Footer justify="between">
          <Box direction="row" align="center" pad={{ between: 'medium' }}>
            <Paragraph margin="none">&copy; {year} Fancy Cars, Inc.</Paragraph>
          </Box>
        </Footer>
      </main>
    );
  }
}
