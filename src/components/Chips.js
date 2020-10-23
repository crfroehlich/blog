import React from 'react';
import Link from './link';
import PageWrapper from './PageWrapper';
import { kebabCase } from 'lodash';
import {ChipSet, Chip} from '@material/react-chips';
import KeywordCloud from 'react-keyword-cloud';

export const Chips = ({ props }) => {
  console.log(props)
  let {
    data: {
      allMdx: {
        group,
      },
    }
  } = props;

  //group = group.filter(a => a.totalCount > 1);
  group.sort((a, b) => b.totalCount - a.totalCount);



  // const chips = (<ChipSet>
  //   {group.map(tag => (
  //     <Link to={`/визуализации/${kebabCase(tag.fieldValue)}`} key={kebabCase(tag.fieldValue)}>
  //       <Chip handleInteraction={() => {}} id={tag.fieldValue} label={tag.fieldValue} key={tag.fieldValue} />
  //     </Link>
  //   ))}
  // </ChipSet>);

  const cloud = (<KeywordCloud
    height={800}
    width={1066}
    rotate={(d) => {
      var positions = [0, 90, 270];
      return positions[Math.floor(Math.random() * positions.length)]
    }}
    data={group.map(g => { return { text: g.fieldValue, value: g.totalCount*10, font: 'impact' } } ) }
    colors={['#fff', '#1ed3c6', '#d1d2d3', '#f8f8f8', '#001934']}
    font={'popper'}
    //spiral={'rectangular'}
    //fontSize={(node) => 1.01 * node.value}
    //onKeyWordClick={console.info}
    //onKeyWordMouseOver={console.info}
  />)

  return (
    <PageWrapper
      pageTitle={'Fancy. Thinking the beast was something we could kill...'}
      props={props}
      pageContent={cloud}
    />
  );
};

export default Chips;
