import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';


const ShoppingBlock = styled.div`
  /* position: fixed; */
  /* display: flex; */
  display: block;
  width: 95%;
  /* height: 100%; */
  background-color: lightgray;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const BookmarksZone = styled.div`
  float: left;
  width: 48%;
  height: auto;
  min-height: 15rem;
  margin-right: 0.3rem;
  background-color: whitesmoke;
`;
const ShoppingCartZone = styled.div`
  float: right;
  width: 48%;
  min-height: 15rem;
  margin-left: 0.3rem;
  background-color: whitesmoke;
`;

const CalculateBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
`;

/* TagBox에서 사용하는 버튼과 일치하는 높이로 설정 후 서로 간의 여백 지정 */
const StyledButton = styled(Button)`
  height: 2.125rem;
  width: 30%;
  margin: 1rem 1rem 1rem 1rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const CalculatedResultBox = styled.textarea`
  margin: 1rem 1rem 1rem 1rem;
  clear: both;
  align-self: center;
  width: 95%;
  min-height: 15rem;
`;

const Item = styled.div`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #90C3E5;
  margin: 0.2rem;
`;

const DescHeader = styled.div`
  border-radius: 4px;
  font-size: 1.5rem;
  text-align: center;
  padding: 0.25rem 1rem;
  color: black;
  outline: none;
  margin: 0.2rem;
`;

class Shopping extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookmarkedNotes: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps() called');
    // get first props from ShoppingContainer
    if (!prevState.bookmarkedNotes && (prevState.bookmarkedNotes !== nextProps.bookmarkedNotes)) {
      console.log('!prevState.bookmarkedNotes && (prevState.bookmarkedNotes !== nextProps.bookmarkedNotes');
      console.log(nextProps.bookmarkedNotes);
      console.log(prevState.bookmarkedNotes);

      if (nextProps.bookmarkedNotes) {
        nextProps.bookmarkedNotes.forEach((note) => {
          note.zone = 'bookmarkedZone';
        });
        console.log('Shopping.js-nextProps.bookmarkedNotes after forEach: ', nextProps.bookmarkedNotes);
      }
      return { bookmarkedNotes: nextProps.bookmarkedNotes };
    }
    return null;
  }


  onDragStart = (ev, noteId) => {
    console.log('onDragStart: ', noteId);
    ev.dataTransfer.setData("noteId", noteId);
    return true;
  }

  onDragOver = ev => {
    ev.preventDefault();
  }


  onDrop = (ev, cat) => {
    ev.preventDefault();
    ev.stopPropagation();
    console.log('onDrop: ');

    // Check Prompt
    const cookingPortion = prompt("Please enter cooking portion", "4");
    if (cookingPortion === null || cookingPortion === "") {
      return;
    } else {

      let noteId = ev.dataTransfer.getData("noteId");
      console.log('noteId: ', noteId);

      // change attribute zone to shoppingCartZone from bookmarkedZone
      let nextBookmarkedNotes = this.state.bookmarkedNotes.filter((note) => {
        if (note._id === noteId) {
          note.zone = cat;
        }
        return note;
      });
      this.setState({
        ...this.state,
        bookmarkedNotes: nextBookmarkedNotes
      });

      // add attribute cookingPortion 
      console.log("cookingPortion: ", cookingPortion);
      let nextBookmarkedNotes2 = this.state.bookmarkedNotes.filter((note) => {
        if (note._id === noteId) {
          note.cookingPortion = cookingPortion;
        }
        return note;
      });
      this.setState({
        ...this.state,
        bookmarkedNotes: nextBookmarkedNotes2
      });
      console.log("bookmarkedNotes after adding portion: ", this.state.bookmarkedNotes);
    }
    return false;
  }

  onCalculateClick = () => {
    let shoppingCartObjArray = [];
    this.state.bookmarkedNotes.filter((note) => {
      if (note.zone === 'shoppingCartZone') {
        shoppingCartObjArray.push(note);
      }
    });
    console.log("shoppingCartObjArray: ", shoppingCartObjArray);

    // get meaningful data for calculation from shoppingCartObjArray
    let shoppingDataObjArray = [];
    shoppingCartObjArray.forEach((shoppingCartObj) => {
      let shoppingDataObj = {};
      shoppingDataObj.portionWeight = (parseFloat(shoppingCartObj.cookingPortion)) / shoppingCartObj.standardPortion;
      shoppingDataObj.ingredients = shoppingCartObj.ingredients;
      shoppingDataObjArray.push(shoppingDataObj);
    });
    console.log("shoppingDataObjArray: ", shoppingDataObjArray);

    // get all Ingredients with amount calculated
    let allIngredientsWithWeightedAmount = [];
    shoppingDataObjArray.forEach((shoppingDataObj) => {
      let ingredientsArray = shoppingDataObj.ingredients.split(';');
      let ingredientsArrayTrimed = []; // ["fruit, banana, 100, g", ...]
      ingredientsArray.forEach((ingredient) => {
        ingredientsArrayTrimed.push(ingredient.trim());
      });
      ingredientsArrayTrimed.forEach((ingredientTrimed) => {
        let ingredientsElementArray = ingredientTrimed.split(',');
        console.log("ingredientsElementArray: ", ingredientsElementArray);
        let amount = parseFloat(ingredientsElementArray[2]);
        console.log("amount: ", amount);
        console.log("shoppingDataObj.portionWeight: ", shoppingDataObj.portionWeight);
        let portionAmount = amount * shoppingDataObj.portionWeight;
        console.log("portionAmount: ", portionAmount);
        ingredientsElementArray[2] = portionAmount;
        console.log("ingredientsElementArray: ", ingredientsElementArray);
        allIngredientsWithWeightedAmount.push(ingredientsElementArray);
      });
    });
    console.log("allIngredientsWithAmount: ", allIngredientsWithWeightedAmount);

    // grouping same ingredients
    let ingredients = allIngredientsWithWeightedAmount; // change to short
    let sameIngredientGroup = [];
    let skipIndex = [];
    // let calculatedResult = [];
    for (let i = 0; i < ingredients.length; i++) {
      let sameIngredientIndex = [];
      if (!skipIndex.includes(i)) {
        let amount = 0;
        for (let j = 0; j < ingredients.length; j++) {
          if (ingredients[i][1] === ingredients[j][1]) {
            sameIngredientIndex.push(j);
            skipIndex.push(j);
            console.log("ingredients[j][2]: ", ingredients[j][2]);
            amount = amount + ingredients[j][2];
          }
          console.log("amount: ", amount);
        }
        sameIngredientIndex.push(amount);
        sameIngredientGroup.push(sameIngredientIndex);
        // calculatedResult.push(ingredients[sameIngredientIndex[0]]);
      }
    }
    console.log(sameIngredientGroup);
    // console.log(calculatedResult);


  }



  render() {
    let noteZone = {
      bookmarkedZone: [],
      shoppingCartZone: []
    };

    if (this.state.bookmarkedNotes) {
      this.state.bookmarkedNotes.forEach((note) => {
        noteZone[note.zone].push(
          <Item
            draggable={true}
            noteId={note._id}
            key={note._id}
            onDragStart={(e) => this.onDragStart(e, note._id)}>
            {note.title}
          </Item>
        );
      })
    }

    return (
      <>
        <ShoppingBlock>
          <BookmarksZone>
            <DescHeader> bookmarked notes: drag to shopping cart </DescHeader>
            {noteZone.bookmarkedZone}
          </BookmarksZone>
          <ShoppingCartZone
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, "shoppingCartZone")}
          >
            <DescHeader> shopping cart: drop here </DescHeader>
            {noteZone.shoppingCartZone}
          </ShoppingCartZone>
        </ShoppingBlock>
        <CalculateBlock>
          <CalculatedResultBox />
          <StyledButton onClick={this.onCalculateClick}>
            Calculate
          </StyledButton>
        </CalculateBlock>
      </>
    );
  }
}

export default Shopping;
