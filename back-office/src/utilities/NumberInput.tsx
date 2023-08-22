import { FC, useCallback, SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type IProps = {
  getter: number;
  setter: Dispatch<SetStateAction<number>>;
  canBeNegative?: boolean;
  name?: string;
};

const NumberInput: FC<IProps> = ({
  getter,
  setter,
  canBeNegative = false,
  name,
}) => {
  const increment = useCallback(
    () => setter((prevstate) => prevstate + 1),
    [setter]
  );

  const decrement = useCallback(
    () =>
      setter((prevstate) =>
        canBeNegative ? prevstate - 1 : prevstate <= 0 ? 0 : prevstate - 1
      ),
    [setter, canBeNegative]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(
        canBeNegative
          ? parseInt(e.target.value)
          : parseInt(e.target.value) >= 0
          ? parseInt(e.target.value)
          : 0
      );
    },
    [setter, canBeNegative]
  );

  return (
    <MainContainer>
      <button
        className="learn-button"
        id="decrement"
        type="button"
        onClick={decrement}
      >
        <FiChevronLeft />
      </button>
      <input
        type="number"
        name={name}
        className="learn-input"
        value={getter}
        onChange={handleChange}
      />
      <button
        className="learn-button"
        id="increment"
        type="button"
        onClick={increment}
      >
        <FiChevronRight />
      </button>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  $color-main: #e07a5f;
  $color-secondary: #f9c784;
  $color-light: #e7e7e7;
  $color-lighter: #fafafa;
  $color-dark: #171717;
  $color-darker: #373737;
  $color-special: #754f44;
  $color-error: #cc2424b3;

  display: flex;
  width: fit-content;
  height: 30px;

  button {
    background: rgba(224, 122, 95, 0.6);
    transition: 0.2s;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 0.7rem;
    }

    &:hover {
      background: rgba(224, 122, 95, 0.9);
    }

    &#increment {
      border-radius: 0 5px 5px 0;
    }

    &#decrement {
      border-radius: 5px 0 0 5px;
    }
  }

  input {
    background: rgba(224, 122, 95, 0.5);
    border-radius: 0;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: rgba(224, 122, 95, 0.5);
    }
  }

  /* Pour les navigateurs Webkit (Chrome, Safari) */
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Pour Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default NumberInput;
