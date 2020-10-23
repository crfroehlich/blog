import React from 'react';
import PageWrapper from './PageWrapper';
import { CardActionIcons, CardActionIcon,CardActionButtons, CardActionButton, CardMedia, CardActions, Card, CardPrimaryAction } from '@rmwc/card'
import { Typography } from '@rmwc/typography';

export const Cards = ({ props }) => {
  console.log(props)
  let {
    data: {
      allMdx: {
        group,
      },
    }
  } = props;

  const d = [1,2,3,4,5,6];

  const cards = (<div>
    {d.map(element => (
      <Card style={{ width: '21rem' }}>
        <CardPrimaryAction>
          <CardMedia
            sixteenByNine
            style={{
              backgroundImage: 'url(images/backgrounds/mb-bg-fb-16.png)'
            }}
          />
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <Typography use="headline6" tag="h2">
              Our Changing Planet
            </Typography>
            <Typography
              use="subtitle2"
              tag="h3"
              theme="textSecondaryOnBackground"
              style={{ marginTop: '-1rem' }}
            >
              by Kurt Wagner
            </Typography>
            <Typography
              use="body1"
              tag="div"
              theme="textSecondaryOnBackground"
            >
              Visit ten places on our planet that are undergoing the biggest
              changes today.
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <CardActionButton>Read</CardActionButton>
            <CardActionButton>Bookmark</CardActionButton>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionIcon onIcon="favorite" icon="favorite_border" />
            <CardActionIcon icon="share" />
            <CardActionIcon icon="more_vert" />
          </CardActionIcons>
        </CardActions>
      </Card>
    ))}
    </div>
  );

  return (
    <PageWrapper
      pageTitle={'cards...'}
      props={props}
      pageContent={cards}
    />
  );
};

export default Cards;
