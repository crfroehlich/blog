import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import { DisplayDate, Link } from './Link';

const getChipStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'left',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

export const TagSet = ({ tags, linkPrefix, date }): JSX.Element => {
  const classes = getChipStyles();

  return (
    <div className={classes.root}>
      {tags?.map((tag) => (
        <Link
          to={`/${linkPrefix}/${kebabCase(tag.name)}`}
          key={kebabCase(tag.name)}
          style={{ marginRight: '0.5rem' }}
        >
          <Badge
            badgeContent={tag.count > 1 ? tag.count : 0}
            color="primary"
            style={{ right: '-0.3rem', top: '-0.3rem' }}
          >
            <Chip style={{ backgroundColor: '#1ed3c6', color: 'fff' }} label={tag.name} />
          </Badge>
        </Link>
      ))}
      <DisplayDate style={{ color: '#1ed3c6' }} date={date} />
    </div>
  );
};
