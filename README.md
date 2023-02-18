# IM - Website

An e-commerce website that serve as a music library and a portfolio about me

## About the Project

This project is a demo website for an e-commerce website. In this project, I had to implement all the functionality and visualization of the Front-end side and the Back end side that we've learned.

As a music producer and a composer, I choose to build a site involving music.
All of the music on this site is an original creation of mine.
this site will continue to be update with more features and maintains.

## Methods used

This Project support a full CRUD Functionality (Create, Read, Update, Delete ).
You can create a product, update an existing one and you can Delete a product.

All the music Files stored on a cloud service called Cloudinary and on an sqlLite tables on the back-end server.
the users are stored using .Net Identity Library that manage their roles and their encrypted password.
in the back-end

The project includes a Header, Footer, and Navbar with links to the different pages.
There is also a Search Bar in the header to search specific items and apply an autocomplete to help the user find more easily the product that he is searching for.

The methods that are used are:

React-Router - To navigate between the pages

useContext - To control all the data and Crud functions in one place.

ProtectedRoutes - to protect specific rout from unauthorized users

useState and useEffect.

In the project, I used mainly used the Material UI V5 Library to design the UI and UX.


## How to Use

First, you need to download the git folder to your computer.
make sure to have an installed version of .Net  and Node JS on your computer,
open a terminal for the client Folder and run:

```bash
npm i
```
to build the dependency.

then, open another terminal for the Api folder
and run:

```bash
dotnet run
```
this will build the first database and insert the first Seed data.


The next step is to run on the client Terminal:

```bash
npm start
```

or run the script from the NPM Scripts

## Usage

The site has two types of clients: Users and Admin.

A user is a regular client that can collect products in his cart, place an order and go to checkout.

An Admin can edit the products page - edit an existing product or adding a new one.
also, an admin can change users roles and make them admin or members.

all those functions are only available for the Admin.

To start - use the demo user or admin to log in:
User-
userName: itamar92
password: Pa$$w0rd

Admin-
email: admin
password: Pa$$w0rd

## Conclustion

During my work on the project, I discovered different methods of code and different approaches to implementing them.
The code has undergone many changes since its inception and various approach combinations.
