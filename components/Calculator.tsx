"use client";

import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [memory, setMemory] = useState(null);
  const [hasDecimal, setHasDecimal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNumber = (num) => {
    setDisplay(prev => prev === '0' ? String(num) : prev + num);
  };

  const handleOperator = (op) => {
    setDisplay(prev => prev + op);
    setHasDecimal(false);
  };

  const handleDecimal = () => {
    if (!hasDecimal) {
      setDisplay(prev => prev + '.');
      setHasDecimal(true);
    }
  };

  const calculate = () => {
    try {
      let expression = display
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/π/g, 'Math.PI')
        .replace(/√/g, 'Math.sqrt')
        .replace(/\^/g, '**');
      
      const result = eval(expression);
      setDisplay(String(result));
      setHasDecimal(String(result).includes('.'));
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setHasDecimal(false);
  };

  const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`p-2 text-white rounded hover:opacity-80 active:opacity-60 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="p-4 bg-blue-500 max-w-md shadow-xl rounded-lg">
      {/* Enhanced Digital Clock Display */}
      <div className="bg-blue-900 p-4 rounded-lg mb-4">
        <div className="text-2xl font-mono text-center text-white">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className="text-lg font-mono text-center text-blue-200">
          {currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="bg-white p-2 mb-4 text-right rounded text-xl h-16 overflow-auto text-black">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={() => handleOperator('sin(')} className="bg-blue-600">sin</Button>
        <Button onClick={() => handleOperator('cos(')} className="bg-blue-600">cos</Button>
        <Button onClick={() => handleOperator('tan(')} className="bg-blue-600">tan</Button>
        <Button onClick={() => handleOperator('π')} className="bg-blue-600">π</Button>

        <Button onClick={() => handleOperator('log(')} className="bg-blue-600">log</Button>
        <Button onClick={() => handleOperator('ln(')} className="bg-blue-600">ln</Button>
        <Button onClick={() => handleOperator('√(')} className="bg-blue-600">√</Button>
        <Button onClick={() => handleOperator('^')} className="bg-blue-600">^</Button>

        <Button onClick={() => handleNumber('7')} className="bg-blue-400">7</Button>
        <Button onClick={() => handleNumber('8')} className="bg-blue-400">8</Button>
        <Button onClick={() => handleNumber('9')} className="bg-blue-400">9</Button>
        <Button onClick={() => handleOperator('/')} className="bg-blue-600">/</Button>

        <Button onClick={() => handleNumber('4')} className="bg-blue-400">4</Button>
        <Button onClick={() => handleNumber('5')} className="bg-blue-400">5</Button>
        <Button onClick={() => handleNumber('6')} className="bg-blue-400">6</Button>
        <Button onClick={() => handleOperator('*')} className="bg-blue-600">×</Button>

        <Button onClick={() => handleNumber('1')} className="bg-blue-400">1</Button>
        <Button onClick={() => handleNumber('2')} className="bg-blue-400">2</Button>
        <Button onClick={() => handleNumber('3')} className="bg-blue-400">3</Button>
        <Button onClick={() => handleOperator('-')} className="bg-blue-600">-</Button>

        <Button onClick={() => handleNumber('0')} className="bg-blue-400">0</Button>
        <Button onClick={handleDecimal} className="bg-blue-400">.</Button>
        <Button onClick={calculate} className="bg-blue-700">=</Button>
        <Button onClick={() => handleOperator('+')} className="bg-blue-600">+</Button>

        <Button onClick={clear} className="bg-blue-700 col-span-2">Clear</Button>
        <Button onClick={() => setDisplay(prev => `(${prev})`)} className="bg-blue-600">()</Button>
        <Button onClick={() => setDisplay(prev => String(-parseFloat(prev)))} className="bg-blue-600">±</Button>
      </div>
    </div>
  );
};

export default Calculator;