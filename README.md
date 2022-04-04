# NVC Gestetner Services
This website is to display products. Allow customers to purchase new products, or book a related services. The website also allows employees or administrator log in to perform their jobs.
- Homepage is common view for everyone.
- Customers can log in (cust. view) to place orders online,  request services for their current products.
- Employees can log in (emp. view) to process all orders and service requests.
- Administrator can log in (admin view) to edit, delete, or add product, download database files.

## API resource
git@github.com:VanNg76/nvc-gestetner-api.git


### How to run
From the Homepage, log in as 1 of 3 differrent views:
- Customer: jimmy@nvc.com (you can register new customer account if you want to have one)
- Employee: james@nvc.com (or use others' in the API employees table)
- Administrator: van@nvc.com (only one account)


### Techonologies used
![image](https://user-images.githubusercontent.com/96600790/161573536-e7cebf42-3b6b-475b-b353-7900522dbd3a.png)
![image](https://user-images.githubusercontent.com/96600790/161573615-bb407e86-7ab7-4ba6-bd21-212cfdc541d8.png)
![image](https://user-images.githubusercontent.com/96600790/161573637-7ba60e06-7503-4400-940d-bb310a86f3aa.png)
![image](https://user-images.githubusercontent.com/96600790/161573659-4c4a0ff7-93c7-4523-9b25-94a43c3dc3ec.png)
![image](https://user-images.githubusercontent.com/96600790/161573676-f5bb6a64-efbf-4d07-b06d-6349cd0f27ed.png)
![image](https://user-images.githubusercontent.com/96600790/161573692-89e33042-06c0-4abb-abbc-e41c1606301b.png)
![image](https://user-images.githubusercontent.com/96600790/161573710-64c63013-3a1a-47db-9f20-b019fa129d54.png)
![image](https://user-images.githubusercontent.com/96600790/161573724-64b0bd82-0149-45a8-9908-4c9f73beecf2.png)


### Instruction for installing NVC
Navigate to the workspace directory, run following commands from your git:
- git clone git@github.com:VanNg76/nvc-gestetner-services.git
- git clone git@github.com:VanNg76/nvc-gestetner-api.git
- cd nvc-gestetner-api
- json-server database.json -p 8088 -w
- cd ..
- cd nvc-gestetner
- npm start

### ERD
![image](https://user-images.githubusercontent.com/96600790/161571655-6b4849b7-578b-48e2-ba35-bc55149e98f4.png)


