export default {
    async getCategories () {
        return await fetch("https://coral-app-cuq3h.ondigitalocean.app//categories")
            .then(res => res.json())
            
    },
    async getProducts () {
        return await fetch("https://coral-app-cuq3h.ondigitalocean.app//products?_sort=categoryId")
            .then(res => res.json())
    },
    async getBW () {
        return await fetch("https://coral-app-cuq3h.ondigitalocean.app//products?categoryId=1")
            .then(res => res.json())
    },
    async getColor () {
        return await fetch("https://coral-app-cuq3h.ondigitalocean.app//products?categoryId=2")
            .then(res => res.json())
    },
    async getWF () {
        return await fetch("https://coral-app-cuq3h.ondigitalocean.app//products?categoryId=3")
            .then(res => res.json())
    },
    async getConsumable () {
        return await fetch("https://coral-app-cuq3h.ondigitalocean.app//products?categoryId=4")
            .then(res => res.json())
        
    },
    async getProductsbyCat (catId) {
        return await fetch(`https://coral-app-cuq3h.ondigitalocean.app//products?categoryId=${catId}`)
            .then(res => res.json())
        
    },
    async getEmployees () {
        return await fetch("https://coral-app-cuq3h.ondigitalocean.app//employees")
            .then(res => res.json())
        
    },
    async getCustomers () {
        return await fetch("https://coral-app-cuq3h.ondigitalocean.app//customers")
            .then(res => res.json())
        
    },
    async getAllOrders () {
        return await fetch(`https://coral-app-cuq3h.ondigitalocean.app//orders?_expand=product`)
            .then(res => res.json())
        
    },
    async getDownloadOrders () {
        return await fetch(`https://coral-app-cuq3h.ondigitalocean.app//orders?_expand=product&_expand=customer&_expand=employee`)
            .then(res => res.json())
    },
    async getOrders (id) {
        return await fetch(`https://coral-app-cuq3h.ondigitalocean.app//orders?customerId=${id}&_expand=product`)
            .then(res => res.json())
        
    },
    async getAllServiceTickets () {
        return await fetch(`https://coral-app-cuq3h.ondigitalocean.app//serviceTickets`)
            .then(res => res.json())
        
    },
    async getDownloadServiceTickets () {
        return await fetch(`https://coral-app-cuq3h.ondigitalocean.app//serviceTickets?_expand=customer&_expand=employee`)
            .then(res => res.json())
        
    },
    async getServiceTickets (id) {
        return await fetch(`https://coral-app-cuq3h.ondigitalocean.app//serviceTickets?customerId=${id}`)
            .then(res => res.json())
        
    }
}
