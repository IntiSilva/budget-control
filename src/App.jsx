import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import ExpensesList from './components/ExpensesList'
import Modal from './components/Modal'
import { generateId } from './helpers'
import NewExpenseIcon from './img/new-expense.svg'

function App() {

  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  )

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  )

  const [isValidBudget, setIsValidBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if( Object.keys(editExpense).length > 0 ) {
        setModal(true)

        setTimeout(() => {
            setAnimateModal(true)
        }, 500);
    }
  }, [ editExpense ])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    if(filter) {
        const filteredExpenses = expenses.filter( expense => expense.category === filter)
        setFilteredExpenses(filteredExpenses)
    }
  }, [filter]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;

    if(budgetLS > 0 ) {
      setIsValidBudget(true)
    }
  }, []);



  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})

    setTimeout(() => {
        setAnimateModal(true)
    }, 500);
  }

  const saveExpense = expense => {
    if(expense.id) {
      // Update
      const updatedExpenses = expenses.map( expenseState => expenseState.id === expense.id ? expense : expenseState)
      setExpenses(updatedExpenses);
      setEditExpense({})
    } else {
      // New expense
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense ])
    }
    setAnimateModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter( expense => expense.id !== id);
    setExpenses(updatedExpenses);
  }

  return (
      <div className={modal ? 'pin' : '' }>
        <Header
            expenses={expenses}
            setExpenses={setExpenses}
            budget={budget}
            setBudget={setBudget}
            isValidBudget={isValidBudget}
            setIsValidBudget={setIsValidBudget}
        />

        {isValidBudget && (
          <>
            <main>
              <Filters
                filter={filter}
                setFilter={setFilter}
              />
              <ExpensesList
                  expenses={expenses}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
                  filter={filter}
                  filteredExpenses={filteredExpenses}
              />
            </main>
            <div className="new-expense">
                <img
                    src={NewExpenseIcon}
                    alt="icono nuevo gasto"
                    onClick={handleNewExpense}
                />
            </div>
          </>
        )}

        {modal && <Modal
                    setModal={setModal}
                    animateModal={animateModal}
                    setAnimateModal={setAnimateModal}
                    saveExpense={saveExpense}
                    editExpense={editExpense}
                    setEditExpense={setEditExpense}
                  />}

      </div>
  )
}

export default App
