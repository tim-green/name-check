/**
 * Vendor imports.
 */
import React from 'react';

/**
 * Custom imports.
 */
import CheckersGroup from '../CheckersGroup/CheckersGroup';
import SearchBox from '../SearchBox/SearchBox';
import Reference from '../Reference/Reference';
import ContactUs from '../ContactUs/ContactUs';
import PageWrapper from '../Layout/Wrappers/PageWrapper';
import SectionWrapper from '../Layout/Wrappers/SectionWrapper';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';

/**
 * A stateless component representing the app.
 */
const NameChecker = () => (
  <div>
    <Header>
      <SearchBox />
    </Header>
    <PageWrapper>
      <Reference />
      <SectionWrapper title="Social network and other sites">
        <CheckersGroup type="sites"/>
      </SectionWrapper>
      <SectionWrapper title="Domain Names">
      <p>not all domain extensions are available at this present point</p>
        <CheckersGroup type="domains"/>
      </SectionWrapper>
    </PageWrapper>
    <Footer>
      <ContactUs />
    </Footer>
  </div>
);

/**
 * Module exports.
 */
export default NameChecker;
