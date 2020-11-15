import React from 'react';
import { RightSidebarStyles, ListItemStyles } from './styles/RightSidebarStyles';
import { IPageProps } from '../types/interfaces';

export const RightSidebar: React.FC<IPageProps> = (props): JSX.Element => {
  const {
    pageContext: { toc },
  } = props;

  const menu = toc?.content?.map((item, i) => {
    return (
      <ListItemStyles key={i} to={item.id} level={1}>
        {item.name}
      </ListItemStyles>
    );
  });
  let title = '';

  switch (toc?.type) {
    case 'Article':
      if (toc.content?.length > 0) {
        title = 'CONTENTS';
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
      <ul className={'rightSideBarUL'}>
        {header}
        {menu}
      </ul>
    </RightSidebarStyles>
  );
};

export default RightSidebar;
