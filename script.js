const ctx = document.getElementById('expenseChart').getContext('2d');
const expenseList = document.getElementById('expense-list');

// Preloaded sample data
let categories = ['Rent', 'Groceries', 'Utilities', 'Transport', 'Entertainment'];
let amounts = [12000, 4500, 2000, 1500, 1000];
let colors = categories.map(() => getRandomColor());

const chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: categories,
    datasets: [{
      label: 'Expenses',
      data: amounts,
      backgroundColor: colors,
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

function updateExpenseList() {
    if(expenseList=== null) expenseList.innerHTML = "No expenses recorded yet.";
  expenseList.innerHTML = "";
  categories.forEach((cat, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${cat} - ₹${amounts[index]} <button onclick="deleteExpense(${index})">Delete</button>`;
    expenseList.appendChild(li);
  });
}

function deleteExpense(index) {
  categories.splice(index, 1);
  amounts.splice(index, 1);
  colors.splice(index, 1);
  chart.data.labels = categories;
  chart.data.datasets[0].data = amounts;
  chart.data.datasets[0].backgroundColor = colors;
  chart.update();
  updateExpenseList();
}

document.getElementById('expense-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const category = document.getElementById('category').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  if (!category || isNaN(amount) || amount <= 0) return;

  categories.push(category);
  amounts.push(amount);
  colors.push(getRandomColor());
  chart.data.labels = categories;
  chart.data.datasets[0].data = amounts;
  chart.data.datasets[0].backgroundColor = colors;
  chart.update();
  updateExpenseList();
  this.reset();
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

// Initial render
updateExpenseList();
