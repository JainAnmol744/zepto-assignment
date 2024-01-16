import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import Data from "../Utils/Constant.js";
import './ChipSelector.css'

interface Item {
  name: string;
  source: string;
  email: string;
}

const ChipSelector: React.FC = () => {
  const allItems: Item[] = Data;
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>(allItems);
  const [inputClick, setInputClick] = useState<boolean>(false);
  const [backevent,setbackevent]= useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  
    // Filter items based on user input from the allItems array
    const filtered = allItems.filter(
      (item: any) =>
        item.name.toLowerCase().includes(value.toLowerCase()) &&
        !selectedItems.includes(item)
    );
    setFilteredItems(filtered);
  };

  const handleItemClick = (item: any) => {
    // Add selected item to chips and remove from the list
    setSelectedItems([...selectedItems, item]);
    setFilteredItems(allItems.filter((i) => i.name !== item.name && !selectedItems.some(selectedItem => selectedItem.name === i.name)));
    setInputValue("");
    setInputClick(false);
    setbackevent(false);
  };
  
  const handleChipRemove = (item: Item) => {

    setSelectedItems(selectedItems.filter((i) => i.name !== item.name));
    const filtered = allItems.filter((i) => !selectedItems.some((selectedItem) => selectedItem.name === i.name));
    // console.log(filtered)
    setFilteredItems([...filtered, item]);
    setInputClick(true);
    setbackevent(false);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if(selectedItems.length>0){
    if (e.key === "Backspace" && inputValue=='') {
      setbackevent(!backevent);
      if(backevent){
      handleChipRemove(selectedItems[selectedItems.length - 1]);
    }
    }
  }

  };

  return (
    <div className="main">
      <div className="selected-items">
        {selectedItems.map((item, index) => (
          <div key={index} className={`chip ${index === selectedItems.length - 1 && backevent ? 'active' : ''}`}>
            <img className="w-5 h-5 rounded-full" src={item.source} alt="Rounded avatar" />
            {item.name} <span onClick={() => handleChipRemove(item)}>X</span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type to search..."
          onClick={() => setInputClick(true)}
        />
      </div>
      <div className="backdrop" onClick={() => setInputClick(false)}></div>
      {inputClick && (
        <ul>
          {filteredItems.length > 0 ? (
            filteredItems.map((item: any, index) => (
              <li className="listoption" key={index} onClick={() => handleItemClick(item)}>
                <img className="w-5 h-5 rounded-full" src={item.source} alt="Rounded avatar" />
                <span className="w-100">{item.name}</span>
                <span style={{ color: "grey" }}>{item.email}</span>
              </li>
            ))
          ) : (
            <li style={{ textAlign: "center" }}>No Options to select</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ChipSelector;
