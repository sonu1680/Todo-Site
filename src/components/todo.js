import React, { useState, useEffect } from "react";
import "./todo.css";

const getlocaldata = () => {
  const lists = localStorage.getItem("tododata");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setinputdata] = useState("");
  const [items, setitems] = useState(getlocaldata);

  const additem = () => {
    if (!inputdata) {
      alert("plz fill data");
    } else {
      const newinputdata = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setitems([...items, newinputdata]);
      setinputdata("");
    }
  };

  const deleteitem = (index) => {
    console.log("delete");
    const updateditems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setitems(updateditems);
  };

  const deleteAll = () => {
    setitems([]);
  };

  useEffect(() => {
    localStorage.setItem("tododata", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <figure>
          <img id="todoimg" src="./todolist.png" alt="" />
          <figcaption>Add Your List Here ✌️</figcaption>
        </figure>
        <div className="additem">
          <input
            type="text"
            placeholder="✍️ add item"
            value={inputdata}
            onChange={(event) => setinputdata(event.target.value)}
          />
          <i className="fa-solid fa-plus" id="addIcon" onClick={additem}></i>
        </div>
        <div className="showitem">
          {items.map((curElem) => {
                return (
            <div className="eachitem" key={curElem.id}>
                <div className="textbox">{curElem.name}</div>
                <div className="icon-btn">
                  {/* <i className="fa-solid fa-edit" id="addIcon2"></i> */}
                  <i
                  className="fa-solid fa-trash"
                    id="addIcon1"
                    onClick={() => {
                      deleteitem(curElem.id);
                    }}
                  ></i>
                </div>
              </div>
            );
          })}

          <div className="remove" onClick={deleteAll}>
            Clear
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
