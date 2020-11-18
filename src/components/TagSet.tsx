import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { DisplayDate, Link } from '..';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';

// const getBadgeStyles = makeStyles((theme: Theme) =>
// createStyles({
//   root: {
//     '& > *': {
//       margin: theme.spacing(2),
//     },
//   },
// }),
// );

// const TagBadge = () => {
//   const classes = getBadgeStyles();

//   return (
//     <div className={classes.root}>
//       <Badge badgeContent={99} {...defaultProps} />
//     </div>
//   );
// };

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

export const TagSet = ({tags, linkPrefix, date}): JSX.Element => {
  const classes = getChipStyles();

  return (
    <div className={classes.root}>
      {tags?.map((tag) => (
        <Link
          to={`/${linkPrefix}/${kebabCase(tag.name)}`}
          key={kebabCase(tag.name)}
          style={{ marginRight: '0.5rem' }}
        >
          <Badge badgeContent={tag.count > 1 ? tag.count : 0} color="primary" style={{ right: '-0.3rem', top: '-0.3rem' }}>
            <Chip style={{ backgroundColor: '#1ed3c6', color: 'fff' }} label={tag.name} onClick={console.log}/>
          </Badge>
        </Link>
      ))}
      <DisplayDate style={{ color: '#1ed3c6' }} date={date} />
    </div>
  );
};

// export const TagSet: React.FC<any> = ({tags, linkPrefix, date}): JSX.Element => (
//   <ChipSet>
//     {tags?.map((tag) => (
//       <Link
//         to={`/${linkPrefix}/${kebabCase(tag.name)}`}
//         key={kebabCase(tag.name)}
//         style={{ marginRight: '0.5rem' }}
//       >
//         <BadgeAnchor>
//           <Tag style={{ backgroundColor: '#1ed3c6', color: 'fff' }} label={tag.name} />
//           <Badge
//             label={tag.count}
//             style={{ backgroundColor: 'cadetblue', right: '-0.3rem', top: '-0.3rem' }}
//           />
//         </BadgeAnchor>
//       </Link>
//     ))}
//     <DisplayDate style={{ color: '#1ed3c6' }} date={date} />
//   </ChipSet>
// )