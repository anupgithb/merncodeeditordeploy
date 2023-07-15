import React from 'react'

const Dropdown = () => {
  return (
    <div>
        <label for="cars">Choose a Language:</label>

        <select name="cars" id="cars">
        <option value="C++">C++</option>
        <option value="C">c</option>
        <option value="Java">java</option>
        </select>
    </div>
  )
}

export default Dropdown