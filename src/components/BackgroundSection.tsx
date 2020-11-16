import styled from '@emotion/styled';
import BackgroundImage from 'gatsby-background-image';
import React from 'react';

const Background: React.FC<any> = ({ image, content }): JSX.Element => {
  return (
    <BackgroundImage Tag="section" fluid={image} backgroundColor={`#040e18`}>
      {content}
    </BackgroundImage>
  );
};

export const BackgroundSection = styled(Background)`
  width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
`;

export default BackgroundSection;
