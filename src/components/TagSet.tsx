import { Badge, Chip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { kebabCase } from 'lodash';
import React from 'react';
import { Link } from './Link';

const getChipStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'left',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    badge: {
      color: theme.palette.text.primary,
      right: '-0.3rem',
      top: '-0.3rem',
    },
    link: {
      marginRight: '0.5rem',
    },
    chip: {
      backgroundColor: '#1ed3c6',
      color: 'fff',
      cursor: 'pointer'
    }
  }),
);

export const TagSet = (props): JSX.Element => {
  const classes = getChipStyles();
  const { tags, linkPrefix } = props;

  return (
    <div className={classes.root}>
      {tags?.map((tag) => (
        <Link
          to={`/${linkPrefix}/${kebabCase(tag.name)}`}
          key={kebabCase(tag.name)}
          className={classes.link}
        >
          <Badge
            badgeContent={tag.count > 1 ? tag.count : 0}
            color="primary"
            className={classes.badge}
          >
            <Chip className={classes.chip} label={tag.name} />
          </Badge>
        </Link>
      ))}
    </div>
  );
};
