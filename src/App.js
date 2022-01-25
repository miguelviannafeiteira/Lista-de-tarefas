import Input from './Input';
import './App.css';
import useForm from './useForm';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import cn from 'clsx';

const data = JSON.parse(localStorage.getItem('data'));

function App() {
  const [todos, setTodos] = useState(data);
  const [mode, setMode] = useState(false);
  const [values, setValues] = useState([]);
  const [selected, setSelected] = useState('All');

  const todo = useForm('todo');

  // Save task in localStorage

  function saveTodo() {
    if (todo.value) {
      var new_data = {
        name: todo.value.toLowerCase(),
        id: Math.random(),
        complete: false,
      };
      if (localStorage.getItem('data') === null) {
        localStorage.setItem('data', `[]`);
      }
      var previus_data = JSON.parse(localStorage.getItem('data'));
      previus_data.push(new_data);
      localStorage.setItem('data', JSON.stringify(previus_data));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveTodo();
    document.location.reload();
  }

  //  Drag and Drop and save de new location of the item

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
    localStorage.setItem('data', JSON.stringify(items));
  }

  //  Buttons on the fotter that filters the list
  //  of items that is shows

  function showAll() {
    const todosAll = JSON.parse(localStorage.getItem('data'));
    setTodos(todosAll);
  }

  function showActive() {
    const reset = JSON.parse(localStorage.getItem('data'));
    const todosActive = reset.filter((item) => {
      return item.complete === false;
    });
    setTodos(todosActive);
  }

  function showCompleted() {
    const reset = JSON.parse(localStorage.getItem('data'));
    const todosCompleted = reset.filter((item) => {
      return item.complete === true;
    });
    setTodos(todosCompleted);
  }

  //  Remove only the items that has complete ===  true

  function clearCompleted() {
    const reset = JSON.parse(localStorage.getItem('data'));
    const todosCompletedToRemove = reset.filter((item) => {
      return item.complete === false;
    });
    localStorage.setItem('data', JSON.stringify(todosCompletedToRemove));
    document.location.reload();
  }

  //  Change between dark and light mode

  function changeMode() {
    if (mode === false) {
      setMode(true);
    } else {
      setMode(false);
    }
  }

  //  Remove the item select

  function remove({ target }) {
    const reset = JSON.parse(localStorage.getItem('data'));
    const notRemoved = reset.filter((item) => {
      return (
        item.name !== target.previousElementSibling.innerText.toLowerCase()
      );
    });
    localStorage.setItem('data', JSON.stringify(notRemoved));
    document.location.reload();
  }

  function handleChange({ target }) {
    //  To have multiples checkbox

    if (target.checked) {
      setValues([...values, target.value]);
    } else {
      setValues(
        values.filter((item) => {
          return item !== target.value;
        }),
      );
    }

    //  Set false or true to de propertry complete

    const reset = JSON.parse(localStorage.getItem('data'));
    const changed = reset.map((item) => {
      if (
        target.checked === false &&
        item.name === target.nextElementSibling.innerText.toLowerCase()
      ) {
        return (item = {
          name: item.name,
          id: item.id,
          complete: false,
        });
      } else if (
        target.checked === true &&
        item.name === target.nextElementSibling.innerText.toLowerCase()
      ) {
        return (item = {
          name: item.name,
          id: item.id,
          complete: true,
        });
      } else {
        return item;
      }
    });

    localStorage.setItem('data', JSON.stringify(changed));
  }

  //  To add class selected

  function itemSelected(e) {
    setSelected(e);
  }

  function FuncAll() {
    itemSelected('All');
    showAll();
  }
  function FuncActived() {
    itemSelected('Active');
    showActive();
  }
  function FuncCompleted() {
    itemSelected('Completed');
    showCompleted();
  }

  //-----------------------------------------------

  return (
    <div className={cn('App', { whiteMode: mode })}>
      <div className={cn('bg', { whiteMode: mode })}>
        <header>
          <h1>TODO</h1>
          <button
            className={cn('modeBtn', { whiteMode: mode })}
            onClick={changeMode}
          ></button>
        </header>
        <form
          className={cn('form', { whiteMode: mode })}
          onSubmit={handleSubmit}
        >
          <Input
            className={cn('inputSave', { whiteMode: mode })}
            name="Create a new Todo..."
            type="text"
            {...todo}
          />
        </form>
        <section className={cn('container', { whiteMode: mode })}>
          <DragDropContext onDragEnd={handleOnDragEnd} className="dragContext">
            <Droppable droppableId="todos">
              {(provided) => (
                <ul
                  className={cn('container', { whiteMode: mode })}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todos &&
                    todos.map(({ id, name }, index) => {
                      return (
                        <Draggable
                          key={id.toString()}
                          draggableId={id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className={cn('item', { whiteMode: mode })}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <div>
                                <input
                                  id={id.toString()}
                                  type="checkbox"
                                  value={id}
                                  checked={values.includes(id.toString())}
                                  onChange={handleChange}
                                />
                                <label
                                  className={cn('tasks', { whiteMode: mode })}
                                  htmlFor={id.toString()}
                                >
                                  {name}
                                </label>
                              </div>
                              <button
                                className={cn('remove', { whiteMode: mode })}
                                onClick={remove}
                              ></button>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </section>
        <footer className={cn('footer', { whiteMode: mode })}>
          <p>{todos && todos.length} items left</p>
          <div>
            <button
              className={cn(
                { active: selected === 'All' },
                { whiteMode: mode },
              )}
              onClick={FuncAll}
            >
              All
            </button>
            <button
              className={cn(
                { active: selected === 'Active' },
                { whiteMode: mode },
              )}
              onClick={FuncActived}
            >
              Active
            </button>
            <button
              className={cn(
                { active: selected === 'Completed' },
                { whiteMode: mode },
              )}
              onClick={FuncCompleted}
            >
              Completed
            </button>
          </div>
          <button className={cn({ whiteMode: mode })} onClick={clearCompleted}>
            {' '}
            Clear Completed
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
