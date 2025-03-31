import csv
import argparse
import json

parser = argparse.ArgumentParser()

parser.add_argument('filename') 

args = parser.parse_args()

cat_map = {
    "Shopping": "Shopping",
    "Mortgage & Rent": "Rent",
    "Restaurants": "Eating & Drinking Out",
    "Credit Card Payment": "Credit Card Payment",
    "Movies & DVDs": "Entertainment",
    "Home Improvement": "Household",
    "Utilities": "Utilities",
    "Music": "Subscriptions",
    "Mobile Phone": "Subscriptions",
    "Gas & Fuel": "Transport",
    "Groceries": "Groceries",
    "Paycheck": "Paycheck",
    "Fast Food": "Eating & Drinking Out",
    "Coffee Shops": "Eating & Drinking Out",
    "Internet": "Utilities",
    "Haircut": "Lifestyle",
    "Alcohol & Bars": "Eating & Drinking Out",
    "Auto Insurance": "Insurance",
    "Entertainment": "Entertainment",
    "Food & Dining": "Eating & Drinking Out",
    "Television": "Subscriptions",
    "Electronics & Software": "Shopping",
}

with open(args.filename) as f:

    reader = csv.DictReader(f)

    count = 0

    categories = []

    accounts = []

    output = []

    for row in reader:
        
        count += 1

        # if row['Category'] not in categories:
        #     categories.append(row['Category'])
        
        # if row['Category'] not in categories:
        #     categories.append(row['Category'])

        # if row['Category'] == 'Electronics & Software': 
        #     print(row['Description'])

        amount = float(row["Amount"]) if row["Transaction Type"] == "credit" else -float(row["Amount"])

        output.append({
            "date": row["Date"],
            "account": row["Account Name"],
            "currency": "USD",
            "description": row["Description"],
            "category": cat_map[row["Category"]],
            "amount": amount
        })

# print(json.dumps(output[0:10], indent=4))

with open('out.json', 'w') as f:

    json.dump(output, f, indent=4)