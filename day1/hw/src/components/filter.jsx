const FilterOption = (props) => {
  return (
    <label htmlFor={props.id}>
      <input
        type="radio"
        name="filter"
        id={props.id}
        value={props.id}
        defaultChecked={props.defaultChecked}
      />
      {props.label}
    </label>
  );
};

const Filter = (props) => {
  const handleChange = (e) => {
    props.filterBy(e.target.value);
  };
  const handleTheme = (e) => {
    let btnToggle = document.querySelector(".btn-toggle");
    let body = document.body;
    var theme = localStorage.getItem("theme");

    if (body.getAttribute("class") === "light" && theme === "light") {
      body.classList = "dark";
      localStorage.setItem("theme", "dark");
      btnToggle.classList.remove("fa-moon");
      btnToggle.classList.add("fa-sun");
    } else {
      body.classList = "light";
      localStorage.setItem("theme", "light");
      btnToggle.classList.add("fa-moon");
      btnToggle.classList.remove("fa-sun");
    }
  };
  return (
    <form onChange={handleChange}>
      <div className="filter">
        <div className="menu">
          <h4 className="name">My Tarks</h4>
          <i className="far fa-moon btn-toggle" onClick={handleTheme} />
        </div>
        <div className="options">
          <FilterOption
            label="All"
            id="all"
            defaultChecked={props.currentOption === "all"}
          />
          <FilterOption
            label="Done"
            id="done"
            defaultChecked={props.currentOption == "done"}
          />
          <FilterOption
            label="Not Done"
            id="notdone"
            defaultChecked={props.currentOption == "notdone"}
          />
        </div>
      </div>
    </form>
  );
};

export default Filter;
