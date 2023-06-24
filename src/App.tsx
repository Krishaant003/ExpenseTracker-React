import { useState } from "react";

import ExpenseFilter from "./Components/ExpenseFilter";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";

function App() {
  const [selectedcategory, setselectedcategory] = useState("");
  const [expenses, setexpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Games" },
    { id: 2, description: "baa", amount: 20, category: "Groceries" },
    { id: 3, description: "caa", amount: 30, category: "Entertainment" },
    { id: 4, description: "daa", amount: 40, category: "Utilities" },
  ]);

  const visibleExpense = selectedcategory
    ? expenses.filter((e) => e.category === selectedcategory)
    : expenses;

  return (
    <>
      <h1>EXPENSE-TRACKER</h1>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setexpenses([
              ...expenses,
              {
                ...expense,
                id: expenses.length + 1,
                amount: expense.Amount,
                category: expense.category,
              },
            ])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setselectedcategory(category)}
        />
      </div>

      <ExpenseList
        expense={visibleExpense}
        onDelete={(id) => setexpenses(expenses.filter((e) => e.id != id))}
      />
    </>
  );
}

export default App;
