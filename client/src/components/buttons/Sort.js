import React from "react";
import styles from "../../styles/Select.module.css";


const Sort = ({ handleSort, sortDescription}) => {

  return (
    <div className={styles.select}>
      <select
        name="sortOption"
        onChange={(e) => {
          handleSort(e.target.value);
        }}
      >
        <option value="default">{sortDescription}</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default Sort;