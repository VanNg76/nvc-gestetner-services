export default {
    async getCategories () {
        return await fetch("http://localhost:8088/categories")
            .then(res => res.json())
            
    },
    async getProducts () {
        return await fetch("http://localhost:8088/products?_sort=categoryId")
            .then(res => res.json())
        
    },
    async getProductsbyCat (catId) {
        return await fetch(`http://localhost:8088/products?categoryId=${catId}`)
            .then(res => res.json())
        
    },
    async getEmployees () {
        return await fetch("http://localhost:8088/employees")
            .then(res => res.json())
        
    },
    async getCustomers () {
        return await fetch("http://localhost:8088/customers")
            .then(res => res.json())
        
    },
    async getAllOrders () {
        return await fetch(`http://localhost:8088/orders?_expand=product`)
            .then(res => res.json())
        
    },
    async getDownloadOrders () {
        return await fetch(`http://localhost:8088/orders?_expand=product&_expand=customer&_expand=employee`)
            .then(res => res.json())
    },
    async getOrders (id) {
        return await fetch(`http://localhost:8088/orders?customerId=${id}&_expand=product`)
            .then(res => res.json())
        
    },
    async getAllServiceTickets () {
        return await fetch(`http://localhost:8088/serviceTickets`)
            .then(res => res.json())
        
    },
    async getServiceTickets (id) {
        return await fetch(`http://localhost:8088/serviceTickets?customerId=${id}`)
            .then(res => res.json())
        
    }
}
