import styled from '@emotion/styled';
import algoliasearch from 'algoliasearch/lite';
import { createRef, useEffect, useState } from 'react';
import {
  Configure,
  connectStateResults,
  Hits,
  Index,
  InstantSearch,
} from 'react-instantsearch-dom';
import { getConfig } from '../../config';
import { Tools } from '../utils';
import { ConnectSearchBox } from './ConnectSearchBox';
import * as PageHit from './PageHit';

const HitsWrapper = styled(({show, ...props}) => {
  return <div  {...props}/>
})`
  asgrid: true;
  display: ${({ show }:any) => (show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: white;
  @media only screen and (max-width: 991px) {
    width: 400px;
    max-width: 400px;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    max-width: 500px;
  }
  border-radius: ${({ theme }:any) => theme.smallBorderRadius};
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid ${({ theme }:any) => theme.darkGray};
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid ${({ theme }:any) => theme.lightGray};
  }
  * {
    margin-top: 0;
    padding: 0;
    color: black !important;
  }
  ul {
    list-style: none;
  }
  mark {
    color: ${({ theme }:any) => theme.lightBlue};
    background: ${({ theme }:any) => theme.darkBlue};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: black;
      background: ${({ theme }:any) => theme.gray};
      padding: 0.1em 0.4em;
      border-radius: ${({ theme }:any) => theme.smallBorderRadius};
    }
  }
  h3 {
    color: black;
    margin: 0 0 0.5em;
  }
  h4 {
    color: black;
    margin-bottom: 0.3em;
  }
`;

const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Results = connectStateResults(
  ({ searching, searchState: state, searchResults: res }) =>
    (searching && `Searching...`) || (res && res.nbHits === 0 && `No results for '${state.query}'`),
);

const useClickOutside = (ref, handler, events = [`mousedown`, `touchstart`]) => {
  const detectClickOutside = (event) =>
    ref && ref.current && !ref.current.contains(event.target) && handler();

  useEffect(() => {
    const tools = new Tools();
    events.forEach((event) => tools.getDocument()?.addEventListener(event, detectClickOutside));

    return () => {
      events.forEach((event) =>
        tools.getDocument()?.removeEventListener(event, detectClickOutside),
      );
    };
  });
};

const config = getConfig();

const searchClient = algoliasearch(
  config.header.search.algoliaAppId,
  config.header.search.algoliaSearchKey,
);

export const SearchComponent = ({ indices, collapse }) => {
  const ref = createRef();

  const [query, setQuery] = useState(``);

  const [focus, setFocus] = useState(false);

  useClickOutside(ref, () => setFocus(false));
  const displayResult = query.length > 0 && focus ? 'showResults' : 'hideResults';

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={setQuery}
      root={{ Root, props: { ref } }}
    >
      <ConnectSearchBox onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      <HitsWrapper className={`hitWrapper ${displayResult}`} show={query.length > 0 && focus}>
        {indices.map(({ name, hitComp }) => {
          return (
            <Index key={name} indexName={name}>
              <Results />
              <Hits hitComponent={PageHit[hitComp](() => setFocus(false))} />
            </Index>
          );
        })}
      </HitsWrapper>
      <Configure hitsPerPage={5} />
    </InstantSearch>
  );
};

export default SearchComponent;
