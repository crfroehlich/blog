import React from 'react';
import { BadgeAnchor, Badge, ChipSet, Chip } from 'rmwc';
import kebabCase from 'lodash/kebabCase';
import { DisplayDate, Link } from '..';

export const TagSet: React.FC<any> = ({tags, linkPrefix, date}): JSX.Element => (
  <ChipSet>
    {tags?.map((tag) => (
      <Link
        to={`/${linkPrefix}/${kebabCase(tag.name)}`}
        key={kebabCase(tag.name)}
        style={{ marginRight: '0.5rem' }}
      >
        <BadgeAnchor>
          <Chip style={{ backgroundColor: '#1ed3c6', color: 'fff' }} label={tag.name} />
          <Badge
            label={tag.count}
            style={{ backgroundColor: 'cadetblue', right: '-0.3rem', top: '-0.3rem' }}
          />
        </BadgeAnchor>
      </Link>
    ))}
    <DisplayDate style={{ color: '#1ed3c6' }} date={date} />
  </ChipSet>
)