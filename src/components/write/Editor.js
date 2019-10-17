import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
  /* 페이지 위 아래 여백 지정 */
  padding-top: 5rem;
  padding-bottom: 5rem;
`;
const TitleInput = styled.input`
  font-size: 2rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const PortionInput = styled.input`
  font-size: 1rem;
  padding: 0.2rem;
  margin-bottom: 2rem;
  width: 100%;
`;

const Textarea = styled.textarea`
  /* 최소 크기 지정 및 padding 제거 */
  padding: 0;
  min-height: 320px;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  outline-color: 1px solid ${palette.gray[4]};
  width: 100%;
`;

const Editor = ({ title, standardPortion, ingredients, memo, onChangeField }) => {

  const onChangeTitle = e => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const onChangeStandardPortion = e => {
    onChangeField({ key: 'standardPortion', value: e.target.value });
  };

  const onChangeIngredients = e => {
    onChangeField({ key: 'ingredients', value: e.target.value });
  };

  const onChangeMemo = e => {
    onChangeField({ key: 'memo', value: e.target.value });
  };

  const standardPortionPlaceholder = 'Standard Portion in number?';

  const titlePlaceholder = 'title e.g) Banana Shake';
  const ingredientPlaceholder = `
  ingredients
  semicolon seperate for each ingredients
  comma seperate for category, igredient name, amount, unit

  e.g)
  dairy,milk,1000,ml; 
  fruit,banana,100,g; 
  etc,ice cube,100,g;
  etc,sugar,50,g; 
  `;

  const memoPlaceholder = `
  memo

  e.g)
  prep. 6hr
  1. prepare ice cube

  steps
  1. pill the banana
  2. put every ingredients in the mixer
  3. enjoy 
  `;

  return (
    <EditorBlock>
      <TitleInput
        placeholder={titlePlaceholder}
        onChange={onChangeTitle}
        value={title}
      />
      <PortionInput
        placeholder={standardPortionPlaceholder}
        onChange={onChangeStandardPortion}
        value={standardPortion}
      />
      <Textarea
        placeholder={ingredientPlaceholder}
        onChange={onChangeIngredients}
        value={ingredients}
      />
      <Textarea
        placeholder={memoPlaceholder}
        onChange={onChangeMemo}
        value={memo}
      />

    </EditorBlock>
  );
};

export default Editor;
