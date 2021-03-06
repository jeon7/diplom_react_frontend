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

const CalculatedResultBox = styled.textarea`
  margin: 1rem 1rem 1rem 1rem;
  clear: both;
  align-self: center;
  width: 95%;
  min-height: 15rem;
`;

const CalculateButton = styled(Button)`
  height: 2.125rem;
  width: 30%;
  text-align: center;
  margin: 1rem 1rem 1rem 1rem;
  & + & {
    margin-left: 0.5rem;
  }
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
      calculatedResultStr: 'hi hi'
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
      return note;
    });
    console.log("shoppingCartObjArray: ", shoppingCartObjArray);

    // get meaningful data for calculation from shoppingCartObjArray
    let shoppingDataObjArray = [];
    shoppingCartObjArray.forEach((shoppingCartObj) => {
      let shoppingDataObj = {};
      shoppingDataObj.portionWeight = parseFloat(shoppingCartObj.cookingPortion) / parseFloat(shoppingCartObj.standardPortion);
      shoppingDataObj.ingredients = shoppingCartObj.ingredients;
      shoppingDataObjArray.push(shoppingDataObj);
    });
    console.log("shoppingDataObjArray: ", shoppingDataObjArray);

    // get all Ingredients with amount calculated
    let allIngredientsWithWeightedAmount = [];
    shoppingDataObjArray.forEach((shoppingDataObj) => {
      let ingredientsArray = shoppingDataObj.ingredients.split(';');
      let ingredientsArrayTrimed = [];
      ingredientsArray.forEach((ingredient) => {
        ingredientsArrayTrimed.push(ingredient.trim());
      });
      console.log(ingredientsArrayTrimed) //string array ["fruit, banana, 100, g", "fruit, apple, 200, g", ...]

      ingredientsArrayTrimed.forEach((ingredientTrimed) => {
        let ingredientsElementArray = ingredientTrimed.split(',');
        console.log("ingredientsElementArray before portion weight apply: ", ingredientsElementArray); // string array ["fruit", "banana", "100", "g"]
        let amount = parseFloat(ingredientsElementArray[2]);
        console.log("amount: ", amount);
        console.log("shoppingDataObj.portionWeight: ", shoppingDataObj.portionWeight);
        let portionAmount = amount * shoppingDataObj.portionWeight;
        console.log("portionAmount: ", portionAmount);

        ingredientsElementArray.splice(2, 1, portionAmount);
        console.log("ingredientsElementArray after portion weight apply: ", ingredientsElementArray); // mixed array ["fruit", "banana", 200, "g"]
        allIngredientsWithWeightedAmount.push(ingredientsElementArray);
      });
    });
    // this console.log allIngredientsWithWeightedAmount value is affected by next algorithm 
    console.log("allIngredientsWithWeightedAmount: ", allIngredientsWithWeightedAmount); // should be array of mixed array


    // grouping same ingredients
    let ingredients = allIngredientsWithWeightedAmount.concat(); // change to short name 
    let sameIngredientGroup = [];
    let skipIndex = [];
    let calculatedResult = [];
    for (let i = 0; i < ingredients.length; i++) {
      let sameIngredientIndex = [];
      if (!skipIndex.includes(i)) {
        let amount = 0;
        for (let j = 0; j < ingredients.length; j++) {
          if (ingredients[i][1] === ingredients[j][1]) {
            sameIngredientIndex.push(j);
            skipIndex.push(j);
            // console.log("ingredients[j][2]: ", ingredients[j][2]);
            amount = amount + ingredients[j][2];
          }
          // console.log("amount: ", amount);
        }
        sameIngredientIndex.push(amount);
        sameIngredientGroup.push(sameIngredientIndex);
        // amount 소수 둘째 자리 까지만 표시
        const newAmount = amount.toFixed(2);
        console.log("newAmount: ", newAmount);
        // 계산된 amount 값으로 교체 
        ingredients[sameIngredientIndex[0]].splice(2, 1, newAmount);
        calculatedResult.push(ingredients[sameIngredientIndex[0]]);
      }
    }
    console.log(sameIngredientGroup);
    console.log(calculatedResult);

    let strIngredientsArray = [];
    calculatedResult.forEach((calculatedIngredient) => {
      strIngredientsArray.push(calculatedIngredient.join(' '));
    });
    strIngredientsArray.sort();
    console.log(strIngredientsArray);
    let strIngredients = strIngredientsArray.join('\n');
    console.log(strIngredients);

    this.setState({
      ...this.state,
      calculatedResultStr: strIngredients
    });

    // alert(strIngredients);
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
          <CalculatedResultBox value={this.state.calculatedResultStr} />
          <CalculateButton onClick={this.onCalculateClick}>
            Calculate
          </CalculateButton>
        </CalculateBlock>
      </>
    );
  }
}

export default Shopping;
