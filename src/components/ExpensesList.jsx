import Expense from './Expense'

const ListadoGastos = ({
        expenses,
        setEditExpense,
        deleteExpense,
        filter,
        filteredExpenses
    }) => {
    return (
        <div className="expenses-list container">


            { filter ? (
                    <>
                        <h2>{filteredExpenses.length ? 'Expenses' : 'There are no expenses in this category'}</h2>
                        {filteredExpenses.map( expense => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setEditExpense={setEditExpense}
                                deleteExpense={deleteExpense}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2>{expenses.length ? 'Expenses' : 'There are no expenses yet'}</h2>
                        {expenses.map( expense => (
                            <Expense
                            key={expense.id}
                            expense={expense}
                            setEditExpense={setEditExpense}
                            deleteExpense={deleteExpense}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default ListadoGastos
