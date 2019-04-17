# TalbankinnMock
https://talbankinnmock.azurewebsites.net/
## Request and Response Examples

### Customers

#### GET /Customers
```json
[
    {
        "_id": "5c780481c0d06446b82f2352",
        "FirstName": "Leifsi",
        "LastName": "P-Ozio",
        "SocialNumber": "240482-3399",
        "Address": "Dúfnahólum 12",
        "City": "Breiðholt",
        "email": "leifsip@dj.is",
        "__v": 0
    },
    {
        "_id": "5c780481c0d06446b82f2351",
        "FirstName": "Bjarki",
        "LastName": "Hrafninn Flýgur",
        "SocialNumber": "240380-3299",
        "Address": "Dúfnahólum 10",
        "City": "Breiðholt",
        "email": "hrafninn4flygur@freedom.is",
        "__v": 0
    }
]
```
#### GET /Customers/{id}
```json
    {
        "_id": "5c780481c0d06446b82f2352",
        "FirstName": "Leifsi",
        "LastName": "P-Ozio",
        "SocialNumber": "240482-3399",
        "Address": "Dúfnahólum 12",
        "City": "Breiðholt",
        "email": "leifsip@dj.is",
        "__v": 0
    }
```
### Accounts

#### GET /Accounts
Get all accounts
```json
[
    {
        "_id": "5cb226a2a989aa17c80c7218",
        "CustomerID": "5c780481c0d06446b82f2351",
        "CurrentBalance": 5000,
        "AccountType": "Debet",
        "AccountNumber": "kt-26-2022",
        "__v": 0
    },
    {
        "_id": "5cb226a2a989aa17c80c7219",
        "CustomerID": "5c780481c0d06446b82f2352",
        "CurrentBalance": 50000,
        "AccountType": "Vaxtareikningur",
        "AccountNumber": "kt-26-2023",
        "__v": 0
    }
]
```
#### GET /Accounts/(id) 
get account by id
```json
    {
        "_id": "5cb226a2a989aa17c80c7218",
        "CustomerID": "5c780481c0d06446b82f2351",
        "CurrentBalance": 5000,
        "AccountType": "Debet",
        "AccountNumber": "kt-26-2022",
        "__v": 0
    }
   ```
#### GET /Accounts/Customers/{id}
 find all accounts of customer
#### GET /Accounts/Customers/{id}/{type} 
find all account per customer and type of account
#### POST /Accounts 
create new account.
Request body:
```json
    {
      "CustomerID": "5c780481c0d06446b82f2351",
       "CurrentBalance": 5000,
       "AccountType": "Debet",
       "AccountNumber": "kt-26-2022", 
    }
   ```

#### PUT /Accounts/{id} 
update account by id
```json
    {
       "CurrentBalance": 5000
    }
   ```
### Bills

#### GET /Bills 
get all bills.
```json
   [
    {
        "_id": "5c8f946697b548098cc6efd2",
        "CustomerID": "5c780481c0d06446b82f2351",
        "PayerName": "Bjarki",
        "Creditor": "LÍN",
        "CreditorAccountNumber": "1108443139-26-222",
        "DueDate": "2019-03-18T12:51:50.769Z",
        "Deadline": "2019-03-18T12:51:50.769Z",
        "Amount": 1500000,
        "__v": 0
    },
    {
        "_id": "5c8f946697b548098cc6efd3",
        "CustomerID": "5c780481c0d06446b82f2351",
        "PayerName": "Bjarki",
        "Creditor": "Mæðrastyrksnefnd",
        "CreditorAccountNumber": "1108443139-26-222",
        "DueDate": "2019-03-18T12:51:50.779Z",
        "Deadline": "2019-03-18T12:51:50.779Z",
        "Amount": 15000,
        "__v": 0
    }
]
   ```
#### GET/Bills/{id} 
get bill by id.
```json
    {
        "_id": "5c8f946697b548098cc6efd2",
        "CustomerID": "5c780481c0d06446b82f2351",
        "PayerName": "Bjarki",
        "Creditor": "LÍN",
        "CreditorAccountNumber": "1108443139-26-222",
        "DueDate": "2019-03-18T12:51:50.769Z",
        "Deadline": "2019-03-18T12:51:50.769Z",
        "Amount": 1500000,
        "__v": 0
    }
   ```
#### GET /Bills/Customers/{customerid} 
gett all bills by customer
#### GET /Bills/Customers/{customerid}/{creditor} 
get all bills by customer and creditor
#### DELETE Bills/{billid}/{accountid} 
pay bill with billid from account 

### Recipients
#### GET /Recipients
 get all recipients.
 ```json
    [
    {
        "_id": "5c8f93f7ce04a78ad06a0128",
        "CustomerID": "5c780481c0d06446b82f2351",
        "FirstName": "Trigger",
        "LastName": "Happy",
        "AccountNumber": "2039863199-26-3039",
        "__v": 0
    },
    {
        "_id": "5c8f93f7ce04a78ad06a0129",
        "CustomerID": "5c780481c0d06446b82f2352",
        "FirstName": "Mumbly",
        "LastName": "Mahooney",
        "AccountNumber": "1008783399-26-2029",
        "__v": 0
    }
]
   ```
#### GET /Recipients/{recipientid} 
get recipient by recipientid.
 ```json
    {
        "_id": "5c8f93f7ce04a78ad06a0128",
        "CustomerID": "5c780481c0d06446b82f2351",
        "FirstName": "Trigger",
        "LastName": "Happy",
        "AccountNumber": "2039863199-26-3039",
        "__v": 0
    }
   ```
#### GET /Recipients/Customers/{customerid}
 get all recipients by customerid
#### GET /Recipients/Customers/{customerid}/{name} 
Get recipient by customerid and recipient name
#### POST /Recipients
 create a new recipient
  ```json
    {
       "CustomerID": "5c780481c0d06446b82f2351",
        "FirstName": "Trigger",
        "LastName": "Happy",
        "AccountNumber": "2039863199-26-3039"
    }
   ```
 ### Stocks
 #### GET /Stocks 
 get all stocks.
  ```json
  [
    {
        "_id": "5cb07e55f171ae06b0e66106",
        "CompanyName": "Arion Banki hf.",
        "ExchangeRate": 76.5,
        "PriceChangePercent": -1.16,
        "StockBid": 75.5,
        "StockAsk": 76.5,
        "Volume": 6619001313,
        "Highest": 77.5,
        "Lowest": 76.5,
        "Currency": "ISK",
        "__v": 0
    },
    {
        "_id": "5cb07e55f171ae06b0e66107",
        "CompanyName": "Icelandair Group hf.",
        "ExchangeRate": 9.6,
        "PriceChangePercent": 0.42,
        "StockBid": 9.57,
        "StockAsk": 9.6,
        "Volume": 9997994,
        "Highest": 9.61,
        "Lowest": 9.6,
        "Currency": "ISK",
        "__v": 0
    }
]
 ```
#### GET /Stocks/{id} 
get stock by id.
 ```json
    {
        "_id": "5cb07e55f171ae06b0e66106",
        "CompanyName": "Arion Banki hf.",
        "ExchangeRate": 76.5,
        "PriceChangePercent": -1.16,
        "StockBid": 75.5,
        "StockAsk": 76.5,
        "Volume": 6619001313,
        "Highest": 77.5,
        "Lowest": 76.5,
        "Currency": "ISK",
        "__v": 0
    }
 ```
#### GET /Stocks/Companys/{companyName} 
get stock by company name

### CreditCards
#### GET /Creditcards 
get all creditcards.
 ```json
    [
    {
        "_id": "5c7be23bd2ad3833040cf76b",
        "CustomerID": "5c780481c0d06446b82f2351",
        "CurrentBalance": 20,
        "CardType": "VISA",
        "__v": 0
    },
    {
        "_id": "5c7be23bd2ad3833040cf76c",
        "CustomerID": "5c780481c0d06446b82f2351",
        "CurrentBalance": 150000,
        "CardType": "Mastercard",
        "__v": 0
    }
]
 ```
#### GET /Creditcards/{cardid} 
get creditcard by id.
 ```json
    {
        "_id": "5c7be23bd2ad3833040cf76b",
        "CustomerID": "5c780481c0d06446b82f2351",
        "CurrentBalance": 20,
        "CardType": "VISA",
        "__v": 0
    }
  ```
#### GET /Creditcards/Customers/{customerid} 
get all creditcards by customer
#### GET /Creditcards/Customers/{customerid}/{type} 
get all cards by customer and type of card
#### PUT /Creditcards/{cardid} 
update creditcard.
Requestbody:
 ```json
    {
       "CurrentBalance" : 5000
    }
    ```

