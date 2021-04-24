import React, { useEffect } from "react";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryRx, updateCategoriesRx } from '../../actions';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;

  const rxCategory = useSelector(staterx => staterx.categories.cats);
  const rxDispatch = useDispatch();
  
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    console.log("CatMenu:useEffect start = " + loading);
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      //dispatch({
      //  type: UPDATE_CATEGORIES,
      //  categories: categoryData.categories
      //});
      categoryData.categories.forEach(cat => rxDispatch(updateCategoriesRx(cat)));

      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    }   else if (loading) {
      idbPromise('categories', 'get').then(categories => {
        //dispatch({
        //  type: UPDATE_CATEGORIES,
        //  categories: categories
        //});
        categories.forEach(cat => rxDispatch(updateCategoriesRx(cat)));
      });
    }
  }, [categoryData, dispatch]);

  const handleClick = id => {
    rxDispatch(setCategoryRx(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {rxCategory.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
