import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `bg-gray-200 py-3 aspect-square rounded-2xl shadow-sm text-gray-900 
        hover:brightness-70 hover:cursor-pointer transition-all duration-100 ${className}`
      )}
    >
      {children}
    </button>
  )
}

function Calculator() {
  const [display, setDisplay] = useState("0")

  const handleClick = (value) => {
    setDisplay((prev) => (prev === "0" ? value : prev + value))
  }

  const handleClear = () => setDisplay("0")

  const handleCalculate = () => {
    try {
      let expression = display
        .replace(/x/g, "*")        // replace x with *
        .replace(/÷/g, "/")        // replace ÷ with /
        .replace(/√/g, "Math.sqrt") // replace √ with Math.sqrt
        .replace(/%/g, "/100")     // make % behave like percentage

      // calculate the result
      let result = eval(expression)
      setDisplay(result.toString())
    } catch (error) {
      setDisplay("Error")
    }
  }

  return (
    <div className="bg-white p-5 rounded-2xl w-80">
      <h3 className="italic py-2 text-xl">Princy Moirangthem</h3>

      {/* Display */}
      <div className="bg-gray-300 p-3 text-right mb-4 text-2xl rounded-xl break-all">
        {display}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-5">
        <Button className="bg-red-200 text-red-400" onClick={handleClear}>C</Button>
        <Button onClick={() => handleClick("%")}>%</Button>
        <Button onClick={() => handleClick("√(")}>√</Button>
        <Button className="bg-orange-400 text-red-950" onClick={() => handleClick("÷")}>÷</Button>

        {[7, 8, 9].map((num) => (
          <Button key={num} onClick={() => handleClick(num.toString())}>{num}</Button>
        ))}
        <Button className="bg-orange-400 text-red-950" onClick={() => handleClick("x")}>x</Button>

        {[4, 5, 6].map((num) => (
          <Button key={num} onClick={() => handleClick(num.toString())}>{num}</Button>
        ))}
        <Button className="bg-orange-400 text-red-950" onClick={() => handleClick("+")}>+</Button>

        {[1, 2, 3].map((num) => (
          <Button key={num} onClick={() => handleClick(num.toString())}>{num}</Button>
        ))}
        <Button className="bg-orange-400 text-red-950" onClick={() => handleClick("-")}>-</Button>

        <Button className="col-span-2 aspect-auto" onClick={() => handleClick("0")}>0</Button>
        <Button onClick={() => handleClick(".")}>.</Button>
        <Button className="bg-green-400 col-span-1" onClick={handleCalculate}>=</Button>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-900 h-dvh w-full flex items-center justify-center relative overflow-clip">
      <Calculator />
    </div>
  )
}

export default App
