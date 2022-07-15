const Item = (props) => {
 const handleChange = () => {
      props.completeTask(props.todo.id)
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={props.todo.completed}
        onChange={handleChange}
      />
      {props.todo.text}
    </li>
  );
};
export default Item