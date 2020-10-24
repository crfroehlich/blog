import React from 'react';
import Link from './link';
import PageWrapper from './PageWrapper';
import { CardActions, CardActionButton, CardActionButtons, CardAction, CardActionItems, CardActionItem, CardActionIcon, CardActionIcons, CardMedia, Card, CardPrimaryAction, Typography, Grid, GridCell } from 'rmwc'
import backgroundImage from './images/card.png';

export const Cards = ({ props }) => {
  console.log(props)
  let {
    data: {
      allMdx: {
        edges
      },
    },
    path,
  } = props;

  const parts = path.split('/');

  const title = parts[parts.length-1];

  const cards = (<Grid>
    {edges.map((e, i) => (
        <GridCell span={4} key={`gridcell_${i}_${e.node.fields.id}`}>
         {/* <Card style={{ width: '21rem', height: '22rem' }}>
            <CardPrimaryAction>
              <CardMedia
                sixteenByNine
                style={{
                  backgroundImage: `url(${backgroundImage})`
                }}
              >
              <Typography use="headline6" tag="h3" style={{ color: '#F8F8F8', textAlign: 'center'}}>
                {e.node.fields.title}
              </Typography>
              </CardMedia>

                <div style={{ padding: '1rem 1rem 1rem 1rem' }}>
                  <Typography
                    use="body1"
                    tag="div"
                    theme="textSecondaryOnBackground"
                  >
                    { e.node.excerpt }
                  </Typography>
              </div>
            </CardPrimaryAction>
          </Card>
        </GridCell> */}
        <Card style={{ width: '21rem' }}>
  <CardPrimaryAction>
    <CardMedia
      sixteenByNine
      style={{
        backgroundImage: `url(${backgroundImage})`
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
</GridCell>
    ))}
    </Grid>
  );

  return (
    <PageWrapper
      pageTitle={title}
      props={props}
      pageContent={cards}
    />
  );
};

export default Cards;
