// export const defaultCategories = [
//   // Income Categories
//   {
//     id: "salary",
//     name: "Salary",
//     type: "INCOME",
//     color: "#22c55e", // green-500
//     icon: "Wallet",
//   },
//   {
//     id: "freelance",
//     name: "Freelance",
//     type: "INCOME",
//     color: "#06b6d4", // cyan-500
//     icon: "Laptop",
//   },
//   {
//     id: "investments",
//     name: "Investments",
//     type: "INCOME",
//     color: "#6366f1", // indigo-500
//     icon: "TrendingUp",
//   },
//   {
//     id: "business",
//     name: "Business",
//     type: "INCOME",
//     color: "#ec4899", // pink-500
//     icon: "Building",
//   },
//   {
//     id: "rental",
//     name: "Rental",
//     type: "INCOME",
//     color: "#f59e0b", // amber-500
//     icon: "Home",
//   },
//   {
//     id: "other-income",
//     name: "Other Income",
//     type: "INCOME",
//     color: "#64748b", // slate-500
//     icon: "Plus",
//   },

//   // Expense Categories
//   {
//     id: "housing",
//     name: "Housing",
//     type: "EXPENSE",
//     color: "#ef4444", // red-500
//     icon: "Home",
//     subcategories: ["Rent", "Mortgage", "Property Tax", "Maintenance"],
//   },
//   {
//     id: "transportation",
//     name: "Transportation",
//     type: "EXPENSE",
//     color: "#f97316", // orange-500
//     icon: "Car",
//     subcategories: ["Fuel", "Public Transport", "Maintenance", "Parking"],
//   },
//   {
//     id: "groceries",
//     name: "Groceries",
//     type: "EXPENSE",
//     color: "#84cc16", // lime-500
//     icon: "Shopping",
//   },
//   {
//     id: "utilities",
//     name: "Utilities",
//     type: "EXPENSE",
//     color: "#06b6d4", // cyan-500
//     icon: "Zap",
//     subcategories: ["Electricity", "Water", "Gas", "Internet", "Phone"],
//   },
//   {
//     id: "entertainment",
//     name: "Entertainment",
//     type: "EXPENSE",
//     color: "#8b5cf6", // violet-500
//     icon: "Film",
//     subcategories: ["Movies", "Games", "Streaming Services"],
//   },
//   {
//     id: "food",
//     name: "Food",
//     type: "EXPENSE",
//     color: "#f43f5e", // rose-500
//     icon: "UtensilsCrossed",
//   },
//   {
//     id: "shopping",
//     name: "Shopping",
//     type: "EXPENSE",
//     color: "#ec4899", // pink-500
//     icon: "ShoppingBag",
//     subcategories: ["Clothing", "Electronics", "Home Goods"],
//   },
//   {
//     id: "healthcare",
//     name: "Healthcare",
//     type: "EXPENSE",
//     color: "#14b8a6", // teal-500
//     icon: "HeartPulse",
//     subcategories: ["Medical", "Dental", "Pharmacy", "Insurance"],
//   },
//   {
//     id: "education",
//     name: "Education",
//     type: "EXPENSE",
//     color: "#6366f1", // indigo-500
//     icon: "GraduationCap",
//     subcategories: ["Tuition", "Books", "Courses"],
//   },
//   {
//     id: "personal",
//     name: "Personal Care",
//     type: "EXPENSE",
//     color: "#d946ef", // fuchsia-500
//     icon: "Smile",
//     subcategories: ["Haircut", "Gym", "Beauty"],
//   },
//   {
//     id: "travel",
//     name: "Travel",
//     type: "EXPENSE",
//     color: "#0ea5e9", // sky-500
//     icon: "Plane",
//   },
//   {
//     id: "insurance",
//     name: "Insurance",
//     type: "EXPENSE",
//     color: "#64748b", // slate-500
//     icon: "Shield",
//     subcategories: ["Life", "Home", "Vehicle"],
//   },
//   {
//     id: "gifts",
//     name: "Gifts & Donations",
//     type: "EXPENSE",
//     color: "#f472b6", // pink-400
//     icon: "Gift",
//   },
//   {
//     id: "bills",
//     name: "Bills & Fees",
//     type: "EXPENSE",
//     color: "#fb7185", // rose-400
//     icon: "Receipt",
//     subcategories: ["Bank Fees", "Late Fees", "Service Charges"],
//   },
//   {
//     id: "other-expense",
//     name: "Other Expenses",
//     type: "EXPENSE",
//     color: "#94a3b8", // slate-400
//     icon: "MoreHorizontal",
//   },
// ];
  

// {/* it makes like this other-expense:#94a3b8 */}

// export const categoryColors = defaultCategories.reduce((acc, category) => {
//   acc[category.id] = category.color;
//   return acc;
// }, {});


export const defaultCategories = [
  // Income Categories
  {
    id: "salary",
    name: "Salary",
    type: "INCOME",
    color: "#3B7C63", // deep elegant green
    icon: "Wallet",
  },
  {
    id: "freelance",
    name: "Freelance",
    type: "INCOME",
    color: "#3C8DAD", // desaturated cyan
    icon: "Laptop",
  },
  {
    id: "investments",
    name: "Investments",
    type: "INCOME",
    color: "#5C62A6", // muted indigo
    icon: "TrendingUp",
  },
  {
    id: "business",
    name: "Business",
    type: "INCOME",
    color: "#B065A0", // dusky pink
    icon: "Building",
  },
  {
    id: "rental",
    name: "Rental",
    type: "INCOME",
    color: "#D4A047", // elegant amber
    icon: "Home",
  },
  {
    id: "other-income",
    name: "Other Income",
    type: "INCOME",
    color: "#7A869A", // cool slate
    icon: "Plus",
  },

  // Expense Categories
  {
    id: "housing",
    name: "Housing",
    type: "EXPENSE",
    color: "#B85C5C", // muted red
    icon: "Home",
    subcategories: ["Rent", "Mortgage", "Property Tax", "Maintenance"],
  },
  {
    id: "transportation",
    name: "Transportation",
    type: "EXPENSE",
    color: "#D78B4C", // warm muted orange
    icon: "Car",
    subcategories: ["Fuel", "Public Transport", "Maintenance", "Parking"],
  },
  {
    id: "groceries",
    name: "Groceries",
    type: "EXPENSE",
    color: "#7E9E40", // earthy olive green
    icon: "Shopping",
  },
  {
    id: "utilities",
    name: "Utilities",
    type: "EXPENSE",
    color: "#5D9EA8", // steel teal
    icon: "Zap",
    subcategories: ["Electricity", "Water", "Gas", "Internet", "Phone"],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    type: "EXPENSE",
    color: "#7566AF", // royal violet
    icon: "Film",
    subcategories: ["Movies", "Games", "Streaming Services"],
  },
  {
    id: "food",
    name: "Food",
    type: "EXPENSE",
    color: "#B35B6A", // wine rose
    icon: "UtensilsCrossed",
  },
  {
    id: "shopping",
    name: "Shopping",
    type: "EXPENSE",
    color: "#AF6C8E", // elegant muted pink
    icon: "ShoppingBag",
    subcategories: ["Clothing", "Electronics", "Home Goods"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    type: "EXPENSE",
    color: "#449D8C", // soft teal green
    icon: "HeartPulse",
    subcategories: ["Medical", "Dental", "Pharmacy", "Insurance"],
  },
  {
    id: "education",
    name: "Education",
    type: "EXPENSE",
    color: "#5C62A6", // matching muted indigo
    icon: "GraduationCap",
    subcategories: ["Tuition", "Books", "Courses"],
  },
  {
    id: "personal",
    name: "Personal Care",
    type: "EXPENSE",
    color: "#B374A4", // soft fuchsia tone
    icon: "Smile",
    subcategories: ["Haircut", "Gym", "Beauty"],
  },
  {
    id: "travel",
    name: "Travel",
    type: "EXPENSE",
    color: "#5CA9D2", // sky-muted blue
    icon: "Plane",
  },
  {
    id: "insurance",
    name: "Insurance",
    type: "EXPENSE",
    color: "#7A869A", // consistent slate
    icon: "Shield",
    subcategories: ["Life", "Home", "Vehicle"],
  },
  {
    id: "gifts",
    name: "Gifts & Donations",
    type: "EXPENSE",
    color: "#D285B9", // muted blush pink
    icon: "Gift",
  },
  {
    id: "bills",
    name: "Bills & Fees",
    type: "EXPENSE",
    color: "#D76C7C", // dusty rose
    icon: "Receipt",
    subcategories: ["Bank Fees", "Late Fees", "Service Charges"],
  },
  {
    id: "other-expense",
    name: "Other Expenses",
    type: "EXPENSE",
    color: "#A0AEBF", // cool steel
    icon: "MoreHorizontal",
  },
];

export const categoryColors = defaultCategories.reduce((acc, category) => {
  acc[category.id] = category.color;
  return acc;
}, {});
