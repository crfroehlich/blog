import Img from 'gatsby-image';
import React from 'react';
import { Paper } from '@material-ui/core';
import { IPageProps } from '../types/interfaces';
import { ListItemStyles, RightSidebarStyles } from './styles/RightSidebarStyles';

export const RightSidebar: React.FC<IPageProps> = (props): JSX.Element => {
  const {
    pageContext: {
      toc,
      mdx: {
        frontmatter: { background },
      },
    },
  } = props;

  const menu = toc?.content?.map((item, i) => {
    return (
      <ListItemStyles key={i} to={item.id} level={1}>
        {item.name}
      </ListItemStyles>
    );
  });
  let title = '';
  let image = <div />;

  switch (toc?.type) {
    case 'Article':
      if (toc.content?.length > 0) {
        title = 'CONTENTS';
      }
      if (background) {
        image = (
          <ListItemStyles key="background_image">
            <Img fixed={background.childImageSharp.fixed} style={{ borderRadius: '5px' }} />
          </ListItemStyles>
        );
      }
      break;
    case 'Tag':
      if (toc.content?.length > 0) {
        title = 'TAGS';
      }
      break;
    case 'Visualization':
      break;
    default:
      break;
  }

  const header = title ? <li className={'rightSideTitle'}>{title}</li> : <div />;

  return (
    <RightSidebarStyles>
      <Paper elevation={15} style={{ backgroundColor: '#33475B' }}>
        <ul className={'rightSideBarUL'}>
          {image}
          {header}
          {menu}
        </ul>
      </Paper>
    </RightSidebarStyles>
  );
};

export default RightSidebar;
