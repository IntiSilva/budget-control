import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
        expenses,
        setExpenses,
        budget,
        setBudget,
        setIsValidBudget
    }) => {

    const [percentage, setPercentage] = useState(10)
    const [avaliable, setAvaliable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect(() => {
      const totalSpent = expenses.reduce( (total, expense ) => expense.amount + total, 0);
      const totalAvaliable = budget - totalSpent;

      // Estimate spent percentage
      const newPercentage = (( ( budget - totalAvaliable ) / budget  ) * 100).toFixed(2);


        setAvaliable(totalAvaliable)
        setSpent(totalSpent)
        setTimeout(() => {
        setPercentage(newPercentage)
         }, 1500);
     }, [expenses])


    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
         })
    }

    const handleResetApp = () => {
        const result = confirm('Do you want to reset budget and expenses?');

        if(result) {
            setExpenses([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }

    return (
        <div className="budget-container container shadow two-columns">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    value={percentage}
                    text={`${percentage}% Spent`}
                />
            </div>

            <div className="budget-content">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Restart App
                </button>
                <p>
                    <span>Budget: </span>{formatAmount(budget)}
                </p>

                <p className={`${avaliable < 0 ? 'negative' : '' }`}>
                    <span>Avaliable: </span>{formatAmount(avaliable)}
                </p>

                <p>
                    <span>Spent: </span>{formatAmount(spent)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
