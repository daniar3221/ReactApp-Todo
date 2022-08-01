import React from 'react'
import ReactDOM  from 'react-dom/client'

const root = ReactDOM.createRoot(
  document.getElementById('root')
)

const TodoList = () => {
  return (
    <ul>
        <li>Learn React</li>
        <li>Make awesome App</li>
    </ul>
  )
}

const TodoHeader = () => {
  return <h1>My Todo List</h1>
}

const SearchPanel = () => {
  const searchText = 'Type here to search'
  const searchStyle = {
    fontSize: '20px',
    color: 'red'
  }

  return <input style={searchStyle} placeholder={searchText}/>
}

const App = () => {
  const isLoggedIn = true
  const loginBox = <span>Log in please</span>
  return (
    <div>
      
      {isLoggedIn ? null : loginBox}
      <TodoHeader />
      <SearchPanel />
      <TodoList />
  </div>
  )
}




root.render(<App />)
