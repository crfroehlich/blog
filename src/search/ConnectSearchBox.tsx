import { connectSearchBox } from 'react-instantsearch-dom';
import styled from '@emotion/styled';
import { Icon } from '../components';

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: white;
  transition: ${({ theme }:any) => theme?.shortTrans};
  border-radius: ${({ theme }:any) => theme?.smallBorderRadius};
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

export const ConnectSearchBox = connectSearchBox(({ refine, ...rest }) => {
  const preventSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form className={'formElement'} onSubmit={preventSubmit}>
      <Icon icon={['fas', 'search']} />
      <Input
        className={'searchInput '}
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => refine(e.target.value)}
        {...rest}
      />
    </Form>
  );
});

export default ConnectSearchBox;
