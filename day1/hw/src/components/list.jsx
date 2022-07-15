import Item from "./item";
const List = (props) => {
  return (
    <ul className="list">
      {props.todos.map((item) => (
        <Item key={item.id} todo={item} completeTask={props.completeTask} />
      ))}
    </ul>
  );
};
export default List