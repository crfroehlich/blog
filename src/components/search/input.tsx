import { connectSearchBox } from 'react-instantsearch-dom';
import { IStyle } from '../../types/interfaces';
import styled from '@emotion/styled';
import { Search } from '@styled-icons/fa-solid/Search';

const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
  margin-right: 10px;
  position: absolute;
  left: 15px;
  color: #2fd2c5;
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: white;
  transition: ${(props: IStyle) => props.theme.shortTrans};
  border-radius: ${(props: IStyle) => props.theme.smallBorderRadius};
  {collapseExpand}
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 767px) {
    width: 100%;
    margin-left: 15px;
  }
`;

export default connectSearchBox(({ refine, ...rest }) => {
  const preventSubmit = e => {
    e.preventDefault();
  };

  return (
    <Form className={'formElement'} onSubmit={preventSubmit}>
      <SearchIcon />
      <Input
        className={'searchInput '}
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        {...rest}
      />
    </Form>
  );
});
