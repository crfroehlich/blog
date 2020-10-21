import React from 'react';
import Link from './link';
import PageWrapper from './PageWrapper';
import { kebabCase } from 'lodash';
import {ChipSet, Chip} from '@material/react-chips';

export const Chips = ({ props }) => {
  let {
    data: {
      allMdx: {
        group,
      },
    }
  } = props;

  group = group.filter(a => a.totalCount > 1);
  group.sort((a, b) => b.totalCount - a.totalCount);

  const chips = (<ChipSet>
    {group.map(tag => (
      <Link to={`/tags/${kebabCase(tag.fieldValue)}`} key={kebabCase(tag.fieldValue)}>
        <Chip handleInteraction={console.log} id={tag.fieldValue} label={tag.fieldValue} key={tag.fieldValue} />
      </Link>
    ))}
  </ChipSet>);

  return (
    <PageWrapper
      pageTitle={'Tags'}
      props={props}
      pageContent={chips}
    />
  );
};

export default Chips;
